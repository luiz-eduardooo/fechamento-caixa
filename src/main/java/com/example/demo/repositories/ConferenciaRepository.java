package com.example.demo.repositories;

import com.example.demo.entities.ConferenciaMensal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ConferenciaRepository extends JpaRepository<ConferenciaMensal, Long> {
    Optional<ConferenciaMensal> findTopByOrderByConferidoEmDesc();
}
