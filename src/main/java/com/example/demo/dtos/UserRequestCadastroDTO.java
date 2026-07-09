package com.example.demo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequestCadastroDTO(@Email @NotBlank String email, @NotBlank String password, @NotBlank String nome) {
}
