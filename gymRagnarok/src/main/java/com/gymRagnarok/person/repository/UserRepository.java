package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName); 
    // Se eliminó la consulta nativa getPassword (no necesaria con BCrypt)
}