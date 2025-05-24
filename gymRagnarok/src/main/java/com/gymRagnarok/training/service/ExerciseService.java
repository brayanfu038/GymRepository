package com.gymRagnarok.training.service;


import com.gymRagnarok.training.domain.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseService {

    List<Exercise> getAllExercises();

    Optional<Exercise> getExerciseById(int id);

    Exercise createExercise(Exercise exercise);

    Exercise updateExercise(int id, Exercise updatedExercise);

    void deleteExercise(int id);

    List<Exercise> searchByName(String name);

    List<Exercise> getBySets(int sets);

    List<Exercise> getByRepetitions(int repetitions);
}
