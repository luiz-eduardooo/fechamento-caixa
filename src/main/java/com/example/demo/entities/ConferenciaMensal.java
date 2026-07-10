package com.example.demo.entities;


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
@Table(name = "conferencia_mensal")
public class ConferenciaMensal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataConferencia;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal contagemFisica;

    @Column(precision = 12, scale = 2)
    private BigDecimal saldoEsperado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Usuario usuario;

    @Transient
    public BigDecimal getDivergencia(){
        if(this.saldoEsperado == null) return null;
        return this.contagemFisica.subtract(this.saldoEsperado);
    }
}
