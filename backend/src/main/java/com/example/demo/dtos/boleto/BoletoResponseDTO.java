package com.example.demo.dtos.boleto;

import com.example.demo.enums.StatusBoleto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record BoletoResponseDTO(Long id, String nomeFornecedor, BigDecimal valor, String codigoDeBarras, LocalDate dataVencimento,
                                LocalDate dataChegada, Instant dataPagamento, StatusBoleto statusBoleto) {
}
