package com.example.demo.repositories;

import com.example.demo.dtos.fechamento.ResumoVendasDTO;
import com.example.demo.entities.Fechamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FechamentoRepository extends JpaRepository<Fechamento, Long> {
    public Optional<Fechamento> findByData(LocalDate data);
    public Boolean existsByData(LocalDate data);
    List<Fechamento> findAllByCreatedAtAfter(Instant createdAt);
    List<Fechamento> findAllByOrderByDataDesc();
    @Query("SELECT new com.example.demo.dtos.fechamento.ResumoVendasDTO(" +
            "COALESCE(SUM(f.totalVendas), 0), COALESCE(SUM(f.totalPix), 0), " +
            "COALESCE(SUM(f.totalCredito), 0), COALESCE(SUM(f.totalDebito), 0)) " +
            "FROM Fechamento f " +
            "WHERE f.data BETWEEN :inicio AND :fim " +
            "AND f.status <> com.example.demo.enums.StatusCaixa.CANCELADO")
    ResumoVendasDTO resumoVendasNoPeriodo(LocalDate inicio, LocalDate fim);
}
