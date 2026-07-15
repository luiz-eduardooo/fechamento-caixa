package com.example.demo.controllers;

import com.example.demo.dtos.usuario.UserResponseDTO;
import com.example.demo.entities.Usuario;
import com.example.demo.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("usuario")
public class UserController {

    private final UserService service;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> listarUsuarios(){
        return ResponseEntity.ok(service.listarUsuarios());
    }

    @GetMapping("/perfil/{id}")
    public ResponseEntity<UserResponseDTO> verPerfil(@PathVariable UUID id, @AuthenticationPrincipal Usuario userLogado){
        return ResponseEntity.ok(service.verPerfil(id, userLogado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> verUsuario(@PathVariable UUID id){
        return ResponseEntity.ok(service.verUsuario(id));
    }

}
