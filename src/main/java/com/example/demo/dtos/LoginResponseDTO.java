package com.example.demo.dtos;

import java.util.UUID;

public record LoginResponseDTO(UUID id, String email, String nome, String token) {
}
