package com.example.demo.services;

import com.example.demo.dtos.conferencia.ConferenciaMensalRequestDTO;
import com.example.demo.dtos.conferencia.ConferenciaMensalResponseDTO;
import com.example.demo.dtos.fechamento.CriadoPorDTO;
import com.example.demo.entities.Boleto;
import com.example.demo.entities.ConferenciaMensal;
import com.example.demo.entities.Fechamento;
import com.example.demo.entities.Usuario;
import com.example.demo.enums.StatusBoleto;
import com.example.demo.exceptions.conferencia.ConferenciaNaoEncontradaException;
import com.example.demo.repositories.BoletoRepository;
import com.example.demo.repositories.ConferenciaRepository;
import com.example.demo.repositories.FechamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CofreService {

    private final FechamentoRepository fechamentoRepository;
    private final BoletoRepository boletoRepository;
    private final ConferenciaRepository conferenciaRepository;

    @Transactional
    public ConferenciaMensalResponseDTO criarConferencia(ConferenciaMensalRequestDTO dto, Usuario userLogado){
        ConferenciaMensal ultima = procurarUltimaConferencia();
        ConferenciaMensal conferenciaMensal = new ConferenciaMensal();
        if(ultima != null){
            conferenciaMensal.setSaldoEsperado(calcularSaldoEsperado(ultima));
        }
        conferenciaMensal.setConferidoEm(Instant.now());
        conferenciaMensal.setUsuario(userLogado);
        conferenciaMensal.setContagemFisica(dto.contagemFisica());
        ConferenciaMensal conferenciaSalva = conferenciaRepository.save(conferenciaMensal);
        return toResponseDTO(conferenciaSalva);
    }

    @Transactional(readOnly = true)
    public ConferenciaMensalResponseDTO verConferencia(Long id){
        return toResponseDTO(procurarConferencia(id));
    }

    @Transactional(readOnly = true)
    public List<ConferenciaMensalResponseDTO> verTodasConferencias(){
        return conferenciaRepository.findAll().stream().map(this::toResponseDTO).toList();
    }


    private BigDecimal calcularSaldoEsperado(ConferenciaMensal ultima){
        return ultima.getContagemFisica().add(somarValoresFechamento(ultima)).subtract(somarValoresBoleto(ultima));
    }

    private BigDecimal somarValoresFechamento(ConferenciaMensal ultima){
        return fechamentoRepository.findAllByCreatedAtAfter(ultima.getConferidoEm()).stream()
                .map(Fechamento::getDinheiroSubido).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal somarValoresBoleto(ConferenciaMensal ultima){
        return boletoRepository.findAllByStatusBoletoAndDataPagamentoAfter(StatusBoleto.PAGO_LOJA, ultima.getConferidoEm())
                .stream().map(Boleto::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private ConferenciaMensal procurarUltimaConferencia(){
        return conferenciaRepository.findTopByOrderByConferidoEmDesc().orElse(null);
    }

    private ConferenciaMensalResponseDTO toResponseDTO(ConferenciaMensal conferenciaMensal){
        return new ConferenciaMensalResponseDTO(conferenciaMensal.getId(), conferenciaMensal.getConferidoEm(), conferenciaMensal.getContagemFisica(), conferenciaMensal.getSaldoEsperado(), conferenciaMensal.getDivergencia(),toCriadoPorDTO(conferenciaMensal.getUsuario()));
    }

    private ConferenciaMensal procurarConferencia(Long id){
        return conferenciaRepository.findById(id).orElseThrow(()-> new ConferenciaNaoEncontradaException("Essa conferencia não foi encontrada na base de dados."));
    }

    private CriadoPorDTO toCriadoPorDTO(Usuario usuario){
        return new CriadoPorDTO(usuario.getId(), usuario.getNome());
    }
}
