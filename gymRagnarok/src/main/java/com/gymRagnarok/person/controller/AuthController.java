package com.gymRagnarok.person.controller;

import com.gymRagnarok.person.dto.AuthRequest;
import com.gymRagnarok.person.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        String token = userService.authenticate(
            authRequest.username(), 
            authRequest.password()
        );
        return ResponseEntity.ok(new TokenResponse(token));
    }

    // Record interno para la respuesta
    public record TokenResponse(String token) {}
}