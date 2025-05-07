package com.gymRagnarok.repository;

import com.gymRagnarok.domain.Person;
import com.gymRagnarok.domain.TypeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    // Buscar por número de identificación (campo @Id)
    Optional<Person> findByIdentificationNumber(Long identificationNumber);

    // Buscar por tipo de identificación (enum TypeId)
    List<Person> findByTypeId(TypeId typeId);

    // Buscar por combinación de nombres y apellidos
    List<Person> findByNamesAndLastNames(String names, String lastNames);

    // Buscar personas cuyos nombres contengan un texto (búsqueda parcial)
    List<Person> findByNamesContaining(String nameFragment);

    // Eliminar por número de identificación
    void deleteByIdentificationNumber(Long identificationNumber);
}