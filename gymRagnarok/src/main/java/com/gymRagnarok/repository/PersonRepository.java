package com.gymRagnarok.repository;

import com.gymRagnarok.domain.Person;
import com.gymRagnarok.domain.TypeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByIdentificationNumber(Integer identificationNumber);
    Optional<Person> findByTypeId(TypeId typeId);

    Optional<Person> findByUserName(String userquery);

    @Query(value = """
select password from user where id = ?1
""", nativeQuery = true)
    Optional<String> getPassword(Long id);

}