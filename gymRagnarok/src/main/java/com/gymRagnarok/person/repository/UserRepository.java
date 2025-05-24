package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUserName(String userName);

    @Query(value = "SELECT password FROM users WHERE id = ?1", nativeQuery = true)
    Optional<String> getPassword(Long id);
}  