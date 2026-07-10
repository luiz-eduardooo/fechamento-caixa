package com.example.demo.dtos.usuario;

import jakarta.validation.constraints.*;

public record UserRequestLoginDTO(@NotBlank @Email String email, @NotBlank String password) {
}
