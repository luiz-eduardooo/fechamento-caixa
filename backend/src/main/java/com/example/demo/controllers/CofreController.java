package com.example.demo.controllers;


import com.example.demo.dtos.conferencia.ConferenciaMensalRequestDTO;
import com.example.demo.dtos.conferencia.ConferenciaMensalResponseDTO;
import com.example.demo.entities.Usuario;
import com.example.demo.services.CofreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("cofre")
public class CofreController {

    private final CofreService service;

    @PostMapping
    public ResponseEntity<ConferenciaMensalResponseDTO> criarConferencia(@Valid @RequestBody ConferenciaMensalRequestDTO dto, @AuthenticationPrincipal Usuario userLogado){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarConferencia(dto, userLogado));
    }

    @GetMapping
    public ResponseEntity<List<ConferenciaMensalResponseDTO>> listarConferencias(){
        return ResponseEntity.ok(service.verTodasConferencias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConferenciaMensalResponseDTO> verUmaConferencia(@PathVariable Long id){
        return ResponseEntity.ok(service.verConferencia(id));
    }
}
