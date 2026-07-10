package com.example.demo.entities;


import com.example.demo.enums.StatusBoleto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "boleto")
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeFornecedor;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private String codigoDeBarras;

    @Column(nullable = false)
    private LocalDate dataVencimento;

    @Column(nullable = false)
    private LocalDate dataChegada;

    @Column
    private LocalDate dataPagamento;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusBoleto statusBoleto = StatusBoleto.PENDENTE;
}
