package com.example.demo.controllers;


import com.example.demo.dtos.boleto.BoletoRequestDTO;
import com.example.demo.dtos.boleto.BoletoResponseDTO;
import com.example.demo.enums.StatusBoleto;
import com.example.demo.services.BoletoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("boleto")
public class BoletoController {

    private final BoletoService service;

    @PostMapping
    public ResponseEntity<BoletoResponseDTO> criarBoleto(@Valid @RequestBody BoletoRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarBoleto(dto));
    }

    @PatchMapping("/{id}/pagar/banco")
    public ResponseEntity<BoletoResponseDTO> pagarBoletoBanco(@PathVariable Long id){
        return ResponseEntity.ok(service.pagarBoleto(id, StatusBoleto.PAGO_BANCO));
    }
    @PatchMapping("/{id}/pagar/dinheiro")
    public ResponseEntity<BoletoResponseDTO> pagarBoletoDinheiro(@PathVariable Long id){
        return ResponseEntity.ok(service.pagarBoleto(id, StatusBoleto.PAGO_LOJA));
    }

    @GetMapping
    public ResponseEntity<List<BoletoResponseDTO>> listarBoletos(@RequestParam(required = false) String fornecedor){
        if(fornecedor != null){
            return ResponseEntity.ok(service.listarBoletosPorFornecedor(fornecedor));
        }
        return ResponseEntity.ok(service.listarBoletos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoletoResponseDTO> verBoleto(@PathVariable Long id){
        return ResponseEntity.ok(service.verBoleto(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarBoleto(@PathVariable Long id){
        service.deletarBoleto(id);
        return ResponseEntity.noContent().build();
    }

}
