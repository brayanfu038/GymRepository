package com.gymRagnarok.repository;

import com.gymRagnarok.domain.Person;
import com.gymRagnarok.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = """
    SELECT * FROM persons where username = ?1
""", nativeQuery = true)
    Optional<Person> findByUserName(String username);

}
