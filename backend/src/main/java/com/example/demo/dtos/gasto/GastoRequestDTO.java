package com.example.demo.dtos.gasto;

import com.example.demo.enums.TipoGasto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record GastoRequestDTO(@NotNull TipoGasto tipoGasto, @PositiveOrZero @NotNull BigDecimal valorGasto) {
}
