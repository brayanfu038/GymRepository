package com.gymRagnarok.person.service;

import com.gymRagnarok.person.domain.Person;
import com.gymRagnarok.person.domain.User;
import com.gymRagnarok.person.dto.UserDTO;
import com.gymRagnarok.person.repository.PersonRepository;
import com.gymRagnarok.person.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@Transactional
public class AuthService {

    //private final PersonRepository personRepository;
    private UserRepository userRepository;

    public AuthService(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }

    public UserDTO.Response login(String userquery, String password) throws Exception {
        User user = userRepository.findByUserName(userquery).orElseThrow(() -> new Exception("usuario no encontrado"));
        System.out.println(user);
        if (!userRepository.getPassword(user.getId()).get().equals(password)) {
            throw new Exception("contrasena incorrecta");
        }
        return new UserDTO.Response(user.getUserName(), reemplazarPorAsteriscos(password));
    }

    public String reemplazarPorAsteriscos(String input) {
        if (input == null) {
            return "";
        }
        return "*".repeat(input.length());
    }
}
