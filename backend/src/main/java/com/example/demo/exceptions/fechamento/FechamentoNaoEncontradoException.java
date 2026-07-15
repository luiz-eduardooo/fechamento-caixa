package com.example.demo.exceptions.fechamento;

public class FechamentoNaoEncontradoException extends RuntimeException {
    public FechamentoNaoEncontradoException(String message) {
        super(message);
    }
}
