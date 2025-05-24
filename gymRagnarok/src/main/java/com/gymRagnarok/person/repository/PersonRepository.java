package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.Person;
import com.gymRagnarok.person.domain.TypeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional; 

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    // Buscar por número de identificación único
    Optional<Person> findByIdentificationNumber(Long identificationNumber);

    // Buscar por tipo de identificación (enum)
    List<Person> findByTypeId(TypeId typeId);

    // Buscar por nombres y apellidos exactos
    List<Person> findByNamesAndLastNames(String names, String lastNames);

    // Buscar por fragmento de nombre
    List<Person> findByNamesContainingIgnoreCase(String nameFragment);

    // Eliminar por número de identificación
    void deleteByIdentificationNumber(Long identificationNumber);
}
