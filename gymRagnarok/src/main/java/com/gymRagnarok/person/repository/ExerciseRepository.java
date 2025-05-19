package com.gymRagnarok.person.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gymRagnarok.person.domain.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}
