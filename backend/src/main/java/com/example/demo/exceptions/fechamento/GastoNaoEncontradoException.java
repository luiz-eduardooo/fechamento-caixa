package com.example.demo.exceptions.fechamento;

public class GastoNaoEncontradoException extends RuntimeException {
    public GastoNaoEncontradoException(String message) {
        super(message);
    }
}
