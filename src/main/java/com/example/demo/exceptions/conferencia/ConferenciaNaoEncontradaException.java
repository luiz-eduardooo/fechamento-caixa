package com.example.demo.exceptions.conferencia;

public class ConferenciaNaoEncontradaException extends RuntimeException {
    public ConferenciaNaoEncontradaException(String message) {
        super(message);
    }
}
