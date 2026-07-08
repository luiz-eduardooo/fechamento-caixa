package com.example.demo.services;

import com.example.demo.dtos.GastoRequestDTO;
import com.example.demo.enums.StatusCaixa;
import com.example.demo.exceptions.*;
import com.example.demo.repositories.FechamentoRepository;
import com.example.demo.dtos.FechamentoRequestDTO;
import com.example.demo.dtos.FechamentoResponseDTO;
import com.example.demo.dtos.GastoResponseDTO;
import com.example.demo.entities.Fechamento;
import com.example.demo.entities.Gasto;
import com.example.demo.repositories.GastoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FechamentoService {

    private final FechamentoRepository repository;
    private final GastoRepository gastoRepository;


    @Transactional
    public FechamentoResponseDTO criarFechamento(FechamentoRequestDTO dto){
        LocalDate hoje = LocalDate.now();
        if(repository.existsByData(hoje)){
            throw new FechamentoJaCriadoException("Ja foi criado um fechamento para esse dia.");
        }
        validarValores(dto);
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
        Gasto gastoSalvo = gastoRepository.save(gasto);
        return gastoResponseDTO(gastoSalvo);
    }

    public FechamentoResponseDTO removerGastos(Long idFechamento, Long idGasto){
        Fechamento fechamento = procurarFechamento(idFechamento);
        validarFechamento(fechamento);
        Gasto gasto = procurarGasto(fechamento, idGasto);
        fechamento.removeGasto(gasto);
        repository.save(fechamento);
        return toResponseDTO(fechamento);
    }

    @Transactional(readOnly = true)
    public List<FechamentoResponseDTO> verTodosFechamentos(){
        return repository.findAll().stream().map((this::toResponseDTO)).toList();
    }

    @Transactional(readOnly = true)
    public FechamentoResponseDTO verFechamento(Long id){
        return toResponseDTO(procurarFechamento(id));
    }

    @Transactional(readOnly = true)
    public FechamentoResponseDTO verFechamentoDiario(){
        Fechamento fechamento = repository.findByData(LocalDate.now()).orElseThrow(()-> new FechamentoJaCriadoException("Já foi criado um fechamento nesse dia."));
        return toResponseDTO(fechamento);
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

    private Gasto procurarGasto(Fechamento fechamento, Long idGasto){
        return fechamento.getGastos().stream().filter(g-> g.getId().equals(idGasto)).findFirst().orElseThrow(()-> new GastoNaoEncontradoException("Esse gasto não foi encontrado na base de dados!"));
    }

    private void validarValores(FechamentoRequestDTO dto){
        BigDecimal soma = dto.totalCredito().add(dto.totalDebito()).add(dto.totalPix());
        if(soma.compareTo(dto.totalVendas()) > 0){
            throw new ValoresInvalidosException("Confira os valores, a soma da maquininha está maior que o valor total vendido.");
        }
    }
}
