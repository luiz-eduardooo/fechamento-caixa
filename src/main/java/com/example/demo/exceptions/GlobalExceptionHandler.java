package com.example.demo.exceptions;

import com.example.demo.dtos.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(FechamentoNaoEncontradoException.class)
    public ResponseEntity<ApiError> fechamentoNaoEncontrado(FechamentoNaoEncontradoException ex, HttpServletRequest request){
        ApiError error = new ApiError(
                Instant.now(),
                404,
                "Not found",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    @ExceptionHandler(FechamentoJaCriadoException.class)
    public ResponseEntity<ApiError> fechamentoJaCriado(FechamentoJaCriadoException ex, HttpServletRequest request){
        ApiError error = new ApiError(
                Instant.now(),
                409,
                "Conflict",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(CaixaJaFechadoException.class)
    public ResponseEntity<ApiError> caixaJaFechado(CaixaJaFechadoException ex, HttpServletRequest request){
        ApiError error = new ApiError(
                Instant.now(),
                404,
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

}
