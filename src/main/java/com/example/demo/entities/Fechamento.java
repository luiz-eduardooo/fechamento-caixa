package com.example.demo.entities;

import com.example.demo.enums.StatusCaixa;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fechamento")
@Getter
@Setter
@NoArgsConstructor
public class Fechamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, scale = 2, precision = 12)
    private BigDecimal totalDebito;
    @Column(nullable = false, scale = 2, precision = 12)
    private BigDecimal totalPix;
    @Column(nullable = false, scale = 2, precision = 12)
    private BigDecimal totalCredito;
    @Column(nullable = false, scale = 2, precision = 12)
    private BigDecimal totalVendas;
    @Column(unique = true)
    private LocalDate data;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusCaixa status = StatusCaixa.ABERTO;
    @Column
    private String observacao;
    @OneToMany(mappedBy = "fechamento",fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Gasto> gastos = new ArrayList<>();

    @Transient
    public BigDecimal getTotalGastos(){
        return gastos.stream().map(Gasto::getValorGasto).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    @Transient
    public BigDecimal getDinheiroEsperado(){
        BigDecimal totalSemDinheiro = totalCredito.add(totalDebito).add(totalPix);
        return totalVendas.subtract(totalSemDinheiro);
    }
    @Transient
    public BigDecimal getDinheiroSubido(){
        return getDinheiroEsperado().subtract(getTotalGastos());
    }

    @Transient
    public Fechamento addGasto(Gasto g){
        g.setFechamento(this);
        gastos.add(g);
        return this;
    }

}
