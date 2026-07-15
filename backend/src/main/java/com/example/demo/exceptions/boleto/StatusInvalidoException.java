package com.example.demo.exceptions.boleto;

public class StatusInvalidoException extends RuntimeException {
    public StatusInvalidoException(String message) {
        super(message);
    }
}
