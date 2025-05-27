package com.gymRagnarok.training.service;

import com.gymRagnarok.training.dto.ExerciseDTO;
import java.util.List;
import java.util.Optional;

public interface ExerciseService {
    List<ExerciseDTO.Response> getAllExercises();
    Optional<ExerciseDTO.Response> getExerciseById(int id);
    ExerciseDTO.Response createExercise(ExerciseDTO.Request exerciseDTO);
    ExerciseDTO.Response updateExercise(int id, ExerciseDTO.Request exerciseDTO);
    void deleteExercise(int id);
    List<ExerciseDTO.Response> searchByName(String name);
    List<ExerciseDTO.Response> getBySets(int sets);
    List<ExerciseDTO.Response> getByRepetitions(int repetitions);
}