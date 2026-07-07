package com.example.demo.dtos;

import java.time.Instant;

public record ApiError(Instant timeStamp, int status, String error, String message, String path) {
}
