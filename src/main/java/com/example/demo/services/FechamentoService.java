package com.example.demo.services;

import com.example.demo.dtos.GastoRequestDTO;
import com.example.demo.enums.StatusCaixa;
import com.example.demo.exceptions.CaixaJaFechadoException;
import com.example.demo.exceptions.FechamentoJaCriadoException;
import com.example.demo.exceptions.FechamentoNaoEncontradoException;
import com.example.demo.repositories.FechamentoRepository;
import com.example.demo.dtos.FechamentoRequestDTO;
import com.example.demo.dtos.FechamentoResponseDTO;
import com.example.demo.dtos.GastoResponseDTO;
import com.example.demo.entities.Fechamento;
import com.example.demo.entities.Gasto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FechamentoService {

    private final FechamentoRepository repository;


    @Transactional
    public FechamentoResponseDTO criarFechamento(FechamentoRequestDTO dto){
        LocalDate hoje = LocalDate.now();
        if(repository.existsByData(hoje)){
            throw new FechamentoJaCriadoException("Ja foi criado um fechamento para esse dia.");
        }
        Fechamento fechamento = new Fechamento();
        fechamento.setData(hoje);
        fechamento.setTotalCredito(dto.totalCredito());
        fechamento.setTotalPix(dto.totalPix());
        fechamento.setTotalVendas(dto.totalVendas());
        fechamento.setTotalDebito(dto.totalDebito());
        fechamento.setObservacao(dto.observacao());
        Fechamento fechamentoSalvo = repository.save(fechamento);
        return toResponseDTO(fechamentoSalvo);
    }
    @Transactional
    public FechamentoResponseDTO fecharCaixa(Long id){
        Fechamento fechamento = procurarFechamento(id);
        validarFechamento(fechamento);
        fechamento.setStatus(StatusCaixa.FECHADO);
        Fechamento fechamentoSalvo = repository.save(fechamento);
        return toResponseDTO(fechamentoSalvo);
    }

    @Transactional
    public GastoResponseDTO adicionarGastos(Long id, GastoRequestDTO dto){
        Fechamento fechamento = procurarFechamento(id);
        validarFechamento(fechamento);
        Gasto gasto = new Gasto();
        gasto.setTipoGasto(dto.tipoGasto());
        gasto.setValorGasto(dto.valorGasto());
        fechamento.addGasto(gasto);
        repository.save(fechamento);
        return gastoResponseDTO(gasto);
    }

    private FechamentoResponseDTO toResponseDTO(Fechamento fechamento){
        return new FechamentoResponseDTO(fechamento.getId(), fechamento.getStatus(), gastoResponseDTOList(fechamento.getGastos()), fechamento.getTotalPix(), fechamento.getTotalCredito(), fechamento.getTotalDebito(), fechamento.getTotalVendas(), fechamento.getObservacao(), fechamento.getData(), fechamento.getDinheiroSubido(), fechamento.getDinheiroEsperado(), fechamento.getTotalGastos());
    }


    private List<GastoResponseDTO> gastoResponseDTOList(List<Gasto> gastos){
        return gastos.stream().map(this::gastoResponseDTO).toList();
    }
    private GastoResponseDTO gastoResponseDTO(Gasto gasto){
        return new GastoResponseDTO(gasto.getId(), gasto.getTipoGasto(), gasto.getValorGasto());
    }

    private Fechamento procurarFechamento(Long id){
        return repository.findById(id).orElseThrow(()-> new FechamentoNaoEncontradoException("Esse fechamento não foi encontrado na base de dados."));
    }

    private void validarFechamento(Fechamento fechamento){
        if(fechamento.getStatus() != StatusCaixa.ABERTO){
            throw new CaixaJaFechadoException("Esse caixa foi fechado ou cancelado!");
        }
    }

}
