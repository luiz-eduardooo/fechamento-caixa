package com.example.demo.dtos.usuario;

import com.example.demo.enums.UserRole;

import java.util.UUID;

public record LoginResponseDTO(UUID id, String email, String nome, String token, UserRole role) {
}
