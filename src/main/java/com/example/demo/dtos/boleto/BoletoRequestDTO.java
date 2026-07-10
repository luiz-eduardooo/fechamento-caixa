package com.example.demo.dtos.boleto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BoletoRequestDTO(@NotBlank String nomeFornecedor, @NotNull @Positive BigDecimal valor, @NotBlank String codigoDeBarras, @NotNull LocalDate dataVencimento
, @NotNull LocalDate dataChegada) {
}
