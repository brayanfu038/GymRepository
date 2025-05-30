package com.gymRagnarok.person.controller;

import com.gymRagnarok.person.dto.UserDTO;
import com.gymRagnarok.person.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Registrar usuario
    @PostMapping("/register")
    public ResponseEntity<UserDTO.Response> registerUser(
            @Valid @RequestBody UserDTO.Request userDTO) {
        UserDTO.Response createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // Autenticar usuario
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest loginRequest) {
        String token = userService.authenticate(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );
        return ResponseEntity.ok(token);
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO.Response> getUserById(@PathVariable Long id) {
        UserDTO.Response user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    //  obtener todos los usuarios
    @GetMapping("/allU")
    public ResponseEntity<List<UserDTO.Response>> getAllUsers() {
        List<UserDTO.Response> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO.Response> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO.Request userDTO) {
        UserDTO.Response updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // Desactivar usuario (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.noContent().build();
    }

    // Clase interna para el login (con validación básica)
    public static class LoginRequest {
        private String username;
        private String password;

        // Getters y Setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}