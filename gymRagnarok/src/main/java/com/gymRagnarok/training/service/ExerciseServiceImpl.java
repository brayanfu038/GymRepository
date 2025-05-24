package com.gymRagnarok.training.service;


import com.gymRagnarok.training.domain.Exercise;
import com.gymRagnarok.training.repository.ExerciseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Optional<Exercise> getExerciseById(int id) {
        return exerciseRepository.findById(id);
    }

    @Override
    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise updateExercise(int id, Exercise updatedExercise) {
        return exerciseRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedExercise.getName());
                    existing.setDescription(updatedExercise.getDescription());
                    existing.setSets(updatedExercise.getSets());
                    existing.setRepetitions(updatedExercise.getRepetitions());
                    return exerciseRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Exercise not found with id " + id));
    }

    @Override
    public void deleteExercise(int id) {
        if (!exerciseRepository.existsById(id)) {
            throw new RuntimeException("Exercise not found with id " + id);
        }
        exerciseRepository.deleteById(id);
    }

    @Override
    public List<Exercise> searchByName(String name) {
        return exerciseRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Exercise> getBySets(int sets) {
        return exerciseRepository.findBySets(sets);
    }

    @Override
    public List<Exercise> getByRepetitions(int repetitions) {
        return exerciseRepository.findByRepetitions(repetitions);
    }
}
