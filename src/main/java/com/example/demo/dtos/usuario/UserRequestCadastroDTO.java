package com.example.demo.dtos.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestCadastroDTO(@Email @NotBlank String email, @NotBlank @Size(min = 6, max = 30) String password, @NotBlank String nome) {
}
