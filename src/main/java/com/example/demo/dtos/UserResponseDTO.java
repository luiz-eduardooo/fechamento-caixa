package com.example.demo.dtos;

import com.example.demo.enums.UserRole;

import java.util.UUID;

public record UserResponseDTO(UUID id, UserRole role, String email, String nome) {
}
