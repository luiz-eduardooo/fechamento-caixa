package com.example.demo.exceptions.fechamento;

public class CaixaJaFechadoException extends RuntimeException {
    public CaixaJaFechadoException(String message) {
        super(message);
    }
}
