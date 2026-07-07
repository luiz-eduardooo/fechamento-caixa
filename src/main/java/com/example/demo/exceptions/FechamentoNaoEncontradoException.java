package com.example.demo.exceptions;

public class FechamentoNaoEncontradoException extends RuntimeException {
    public FechamentoNaoEncontradoException(String message) {
        super(message);
    }
}
