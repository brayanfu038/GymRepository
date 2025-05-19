package com.gymRagnarok.person.controller;

import com.gymRagnarok.person.dto.UserDTO;
import com.gymRagnarok.exception.InvalidCredentialsException;
import com.gymRagnarok.person.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO.Request user) {
        try {
            String token = authService.login(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(new AuthResponse(token, "Login exitoso"));
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Credenciales inválidas", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Error interno del servidor", e.getMessage()));
        }
    }

    // --- DTOs de respuesta --- 
    private static class AuthResponse {
        private final String token;
        private final String message;

        public AuthResponse(String token, String message) {
            this.token = token;
            this.message = message;
        }
        public String getToken() { return token; }
        public String getMessage() { return message; }
    }

    private static class ErrorResponse {
        private final String error;
        private final String details;

        public ErrorResponse(String error, String details) {
            this.error = error;
            this.details = details;
        }
        public String getError() { return error; }
        public String getDetails() { return details; }
    }
}
