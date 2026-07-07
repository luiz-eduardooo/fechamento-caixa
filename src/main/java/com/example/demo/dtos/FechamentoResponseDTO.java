package com.example.demo.dtos;

import com.example.demo.enums.StatusCaixa;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record FechamentoResponseDTO(Long id, StatusCaixa status, List<GastoResponseDTO> gastos, BigDecimal totalPix, BigDecimal totalCredito, BigDecimal totalDebito, BigDecimal totalVendas, String observacao, LocalDate data, BigDecimal dinheiroSubido, BigDecimal dinheiroEsperado, BigDecimal totalGastos) {
}
