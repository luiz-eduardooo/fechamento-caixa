package com.example.demo.dtos;

import com.example.demo.enums.TipoGasto;

import java.math.BigDecimal;

public record GastoResponseDTO(Long id, TipoGasto tipoGasto, BigDecimal valorGasto) {
}
