package com.example.demo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record UserRequestLoginDTO(@NotBlank @Email String email, @NotBlank @Min(3) @Max(30) String password) {
}
