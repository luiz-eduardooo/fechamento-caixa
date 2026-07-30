package com.example.demo.dtos.fechamento;

import java.math.BigDecimal;

public record ResumoVendasDTO(BigDecimal totalVendas, BigDecimal totalPix, BigDecimal totalCredito, BigDecimal totalDebito) {
}
