package com.example.demo.dtos.conferencia;

import com.example.demo.dtos.fechamento.CriadoPorDTO;
import com.example.demo.entities.Usuario;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ConferenciaMensalResponseDTO(Long id, LocalDate dataConferencia, BigDecimal contagemFisica, BigDecimal saldoEsperado,BigDecimal divergencia,CriadoPorDTO usuario) {
}
