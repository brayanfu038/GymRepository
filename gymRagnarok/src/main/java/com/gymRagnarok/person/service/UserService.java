package com.gymRagnarok.person.service;

import com.gymRagnarok.person.domain.User;
import com.gymRagnarok.person.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
    return userRepository.findByUserName(username) 
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
}

    public String authenticate(String username, String password) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}