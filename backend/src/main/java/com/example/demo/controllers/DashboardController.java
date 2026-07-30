package com.example.demo.controllers;

import com.example.demo.dtos.fechamento.ResumoVendasDTO;
import com.example.demo.services.FechamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequiredArgsConstructor
    @RequestMapping("dashboard")
    public class DashboardController {

        private final FechamentoService service; // ou FechamentoService, onde você pôs o método

        @GetMapping("/resumo-vendas")
        public ResponseEntity<ResumoVendasDTO> resumoVendas(){
            return ResponseEntity.ok(service.resumoDeVendas());
        }
    }

