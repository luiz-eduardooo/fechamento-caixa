package com.example.demo.repositories;

import com.example.demo.entities.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GastoRepository extends JpaRepository<Gasto, Long> {
}
