package com.example.demo.controllers;


import com.example.demo.dtos.LoginResponseDTO;
import com.example.demo.dtos.UserRequestCadastroDTO;
import com.example.demo.dtos.UserRequestLoginDTO;
import com.example.demo.dtos.UserResponseDTO;
import com.example.demo.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

    private final UserService service;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUsuario(@Valid @RequestBody UserRequestLoginDTO dto){
        return ResponseEntity.ok(service.loginUsuario(dto));
    }
    @PostMapping("/cadastro")
    public ResponseEntity<UserResponseDTO> cadastroUsuario(@Valid @RequestBody UserRequestCadastroDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastroUsuario(dto));
    }

}
