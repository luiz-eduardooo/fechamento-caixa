package com.example.demo.controllers;

import com.example.demo.dtos.fechamento.FechamentoRequestDTO;
import com.example.demo.dtos.fechamento.FechamentoResponseDTO;
import com.example.demo.dtos.gasto.GastoRequestDTO;
import com.example.demo.dtos.gasto.GastoResponseDTO;
import com.example.demo.entities.Usuario;
import com.example.demo.services.FechamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("fechamento")
@RequiredArgsConstructor
public class FechamentoController {
    private final FechamentoService service;

    @PostMapping
    public ResponseEntity<FechamentoResponseDTO> criarFechamento(@Valid @RequestBody FechamentoRequestDTO dto, @AuthenticationPrincipal Usuario userLogado){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarFechamento(dto, userLogado));
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

    @DeleteMapping("/{idFechamento}/gasto/{idGasto}")
    public ResponseEntity<FechamentoResponseDTO> deletarGasto(@PathVariable Long idFechamento, @PathVariable Long idGasto){
        return ResponseEntity.status(200).body(service.removerGastos(idFechamento, idGasto));
    }

    @PatchMapping("/{id}/abrir")
    public ResponseEntity<FechamentoResponseDTO> reabrirCaixa(@PathVariable Long id){
        return ResponseEntity.ok(service.reabrirCaixa(id));
    }
}
