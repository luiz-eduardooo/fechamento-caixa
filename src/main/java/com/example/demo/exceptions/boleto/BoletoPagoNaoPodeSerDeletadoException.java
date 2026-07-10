package com.example.demo.exceptions.boleto;

public class BoletoPagoNaoPodeSerDeletadoException extends RuntimeException {
    public BoletoPagoNaoPodeSerDeletadoException(String message) {
        super(message);
    }
}
