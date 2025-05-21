package com.gymRagnarok.person.service;

import com.gymRagnarok.exception.InvalidCredentialsException;
import com.gymRagnarok.person.domain.User;
import com.gymRagnarok.person.repository.UserRepository;
import com.gymRagnarok.config.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User findByUsername(String username) {
        return userRepository.findByUserName(username)
            .orElseThrow(() -> new InvalidCredentialsException("Usuario no encontrado"));
    }

    public String authenticate(String username, String password) {
        User user = findByUsername(username);
        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Credenciales inválidas");
        }
        return jwtUtil.generateToken(username);
    }
}