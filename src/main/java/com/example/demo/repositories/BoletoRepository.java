package com.example.demo.repositories;

import com.example.demo.entities.Boleto;
import com.example.demo.enums.StatusBoleto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface BoletoRepository extends JpaRepository<Boleto, Long> {
    public List<Boleto> findAllByNomeFornecedor(String nomeFornecedor);
    List<Boleto> findAllByStatusBoletoAndDataPagamentoAfter(StatusBoleto status, Instant data);
}
