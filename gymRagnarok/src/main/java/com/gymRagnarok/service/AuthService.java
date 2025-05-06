package com.gymRagnarok.service;

import com.gymRagnarok.domain.Person;
import com.gymRagnarok.dto.UserDTO;
import com.gymRagnarok.repository.PersonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@Transactional
public class AuthService {

    private final PersonRepository personRepository;

    public AuthService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public UserDTO.Response login(String userquery, String password) throws Exception {
        Person user = personRepository.findByUserName(userquery).orElseThrow(() -> new Exception("usuario no encontrado"));
        if (!personRepository.getPassword(user.getId()).get().equals(password)) {
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
