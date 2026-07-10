package com.example.demo.exceptions.fechamento;

public class CaixaJaAbertoException extends RuntimeException {
    public CaixaJaAbertoException(String message) {
        super(message);
    }
}
