package com.example.demo.dtos;

import jakarta.validation.constraints.*;

public record UserRequestLoginDTO(@NotBlank @Email String email, @NotBlank String password) {
}
