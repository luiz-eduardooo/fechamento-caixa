package com.example.demo.dtos.conferencia;

import com.example.demo.entities.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ConferenciaMensalRequestDTO(@NotNull @Positive BigDecimal contagemFisica) {
}
