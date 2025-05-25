package com.gymRagnarok.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ========================================================================
    // Excepciones Personalizadas como Clases Internas
    // ========================================================================
    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class RoleNotFoundException extends RuntimeException {
        public RoleNotFoundException(String message) {
            super(message);
        }
    }

    public static class DuplicateUsernameException extends RuntimeException {
        public DuplicateUsernameException(String message) {
            super(message);
        }
    }

    public static class MissingRequiredFieldException extends RuntimeException {
        public MissingRequiredFieldException(String message) {
            super(message);
        }
    }

    public static class DuplicateRoleException extends RuntimeException {
        public DuplicateRoleException(String message) {
            super(message);
        }
    }

    // ========================================================================
    // Manejadores de Excepciones
    // ========================================================================
    @ExceptionHandler({
        InvalidCredentialsException.class,
        UserNotFoundException.class,
        RoleNotFoundException.class,
        DuplicateUsernameException.class,
        MissingRequiredFieldException.class
    })
    public ResponseEntity<ErrorResponse> handleCustomExceptions(RuntimeException ex) {
        HttpStatus status = determineHttpStatus(ex);
        return ResponseEntity.status(status).body(new ErrorResponse(status.value(), ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return ResponseEntity.internalServerError().body(
            new ErrorResponse(500, "Error interno del servidor"));
    }

    @ExceptionHandler(DuplicateRoleException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateRole(DuplicateRoleException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage())
        );
    }

    // ========================================================================
    // Métodos Auxiliares
    // ========================================================================
    private HttpStatus determineHttpStatus(RuntimeException ex) {
        if (ex instanceof InvalidCredentialsException) {
            return HttpStatus.UNAUTHORIZED;
        } else if (ex instanceof UserNotFoundException) {
            return HttpStatus.NOT_FOUND;
        } else if (ex instanceof DuplicateUsernameException) {
            return HttpStatus.CONFLICT;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    // ========================================================================
    // Clase para Respuestas de Error
    // ========================================================================
    public record ErrorResponse(int status, String message) {}
}