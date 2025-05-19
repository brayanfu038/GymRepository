package com.gymRagnarok.person.service;

import com.gymRagnarok.exception.InvalidCredentialsException;
import com.gymRagnarok.person.repository.UserRepository;
import com.gymRagnarok.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String rawPassword) {
        // Si no existe usuario, lanzar excepción específica
        var user = userRepository.findByUserName(username)
                .orElseThrow(() -> new InvalidCredentialsException("Usuario no encontrado"));

        // Si la contraseña no coincide, misma excepción
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new InvalidCredentialsException("La contraseña es incorrecta");
        }

        // Todo OK: generar y devolver JWT
        return jwtUtil.generateToken(username);
    }
}
