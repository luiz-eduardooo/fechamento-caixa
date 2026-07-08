package com.example.demo.exceptions;

public class GastoNaoEncontradoException extends RuntimeException {
    public GastoNaoEncontradoException(String message) {
        super(message);
    }
}
