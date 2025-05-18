package com.gymRagnarok.person.controller; 
import com.gymRagnarok.person.dto.UserDTO;
import com.gymRagnarok.person.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/login")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserDTO.Request user) {

        try {
            return ResponseEntity.ok(authService.login(user.getUsername(), user.getPassword()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
