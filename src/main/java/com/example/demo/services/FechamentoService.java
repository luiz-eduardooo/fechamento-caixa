package com.example.demo.services;

import com.example.demo.exceptions.FechamentoJaCriadoException;
import com.example.demo.repositories.FechamentoRepository;
import com.example.demo.dtos.FechamentoRequestDTO;
import com.example.demo.dtos.FechamentoResponseDTO;
import com.example.demo.dtos.GastoResponseDTO;
import com.example.demo.entities.Fechamento;
import com.example.demo.entities.Gasto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FechamentoService {

    private final FechamentoRepository repository;

    public FechamentoResponseDTO criarFechamento(FechamentoRequestDTO dto){
        if(repository.existsByData(LocalDate.now())){
            throw new FechamentoJaCriadoException("Ja foi criado um fechamento para esse dia.");
        }
        Fechamento fechamento = new Fechamento();
        fechamento.setData(LocalDate.now());
        fechamento.setTotalCredito(dto.totalCredito());
        fechamento.setTotalPix(dto.totalPix());
        fechamento.setTotalVendas(dto.totalVendas());
        fechamento.setTotalDebito(dto.totalDebito());
        fechamento.setObservacao(dto.observacao());
        Fechamento fechamentoSalvo = repository.save(fechamento);
        return toResponseDTO(fechamentoSalvo);
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

}
