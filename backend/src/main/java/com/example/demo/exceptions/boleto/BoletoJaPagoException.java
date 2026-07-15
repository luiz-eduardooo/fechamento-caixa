package com.example.demo.exceptions.boleto;

public class BoletoJaPagoException extends RuntimeException {
    public BoletoJaPagoException(String message) {
        super(message);
    }
}
