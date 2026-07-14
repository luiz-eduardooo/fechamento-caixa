package com.example.demo.repositories;

import com.example.demo.entities.Fechamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FechamentoRepository extends JpaRepository<Fechamento, Long> {
    public Optional<Fechamento> findByData(LocalDate data);
    public Boolean existsByData(LocalDate data);
    List<Fechamento> findAllByCreatedAtAfter(Instant createdAt);

}
