package com.gymRagnarok.training.repository;

import com.gymRagnarok.training.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

    // Buscar ejercicios por nombre (contiene, sin importar mayúsculas)
    List<Exercise> findByNameContainingIgnoreCase(String name);

    // Buscar por número de sets o repeticiones exactas
    List<Exercise> findBySets(int sets);
    List<Exercise> findByRepetitions(int repetitions);
}
