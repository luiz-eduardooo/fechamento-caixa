package com.example.demo;

import com.example.demo.entities.Fechamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface FechamentoRepository extends JpaRepository<Fechamento, Long> {
    public Optional<Fechamento> findByData(LocalDate data);
    public Boolean existsByData(LocalDate data);
}
