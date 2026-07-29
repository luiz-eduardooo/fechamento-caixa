package com.example.demo.dtos.fechamento;

import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record FechamentoUpdateDTO (@PositiveOrZero BigDecimal totalVendas, @PositiveOrZero BigDecimal totalPix, @PositiveOrZero BigDecimal totalCredito, @PositiveOrZero BigDecimal totalDebito, String observacao){
}
