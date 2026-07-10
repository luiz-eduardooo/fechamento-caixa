package com.example.demo.dtos.fechamento;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record FechamentoRequestDTO(@NotNull @PositiveOrZero BigDecimal totalPix,@PositiveOrZero @NotNull BigDecimal totalCredito, @PositiveOrZero @NotNull BigDecimal totalDebito, @PositiveOrZero @NotNull BigDecimal totalVendas, String observacao) {
}
