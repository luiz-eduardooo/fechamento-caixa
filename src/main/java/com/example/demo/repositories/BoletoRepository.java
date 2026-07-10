package com.example.demo.repositories;

import com.example.demo.entities.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoletoRepository extends JpaRepository<Boleto, Long> {
    public List<Boleto> findAllByNomeFornecedor(String nomeFornecedor);
}
