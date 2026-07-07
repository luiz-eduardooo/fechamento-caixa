package com.example.demo.controllers;

import com.example.demo.dtos.FechamentoRequestDTO;
import com.example.demo.dtos.FechamentoResponseDTO;
import com.example.demo.dtos.GastoRequestDTO;
import com.example.demo.dtos.GastoResponseDTO;
import com.example.demo.services.FechamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fechamento")
@RequiredArgsConstructor
public class FechamentoController {
    private final FechamentoService service;

    @PostMapping
    public ResponseEntity<FechamentoResponseDTO> criarFechamento(@Valid @RequestBody FechamentoRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarFechamento(dto));
    }

    @PatchMapping("/{id}/fechar")
    public ResponseEntity<FechamentoResponseDTO> fecharCaixa(@PathVariable Long id){
        return ResponseEntity.ok(service.fecharCaixa(id));
    }

    @PostMapping("/{id}/gasto")
    public ResponseEntity<GastoResponseDTO> criarGasto(@PathVariable Long id, @Valid @RequestBody GastoRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.adicionarGastos(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<FechamentoResponseDTO>> verTodosFechamentos(){
        return ResponseEntity.ok(service.verTodosFechamentos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FechamentoResponseDTO> verFechamento(@PathVariable Long id){
        return ResponseEntity.ok(service.verFechamento(id));
    }
    @GetMapping("/hoje")
    public ResponseEntity<FechamentoResponseDTO> verFechamentoDiario(){
        return ResponseEntity.ok(service.verFechamentoDiario());
    }
}
