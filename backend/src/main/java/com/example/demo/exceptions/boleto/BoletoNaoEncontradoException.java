package com.example.demo.exceptions.boleto;

public class BoletoNaoEncontradoException extends RuntimeException {
    public BoletoNaoEncontradoException(String message) {
        super(message);
    }
}
