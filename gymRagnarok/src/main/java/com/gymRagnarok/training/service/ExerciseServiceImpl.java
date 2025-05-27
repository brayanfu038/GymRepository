package com.gymRagnarok.training.service;

import com.gymRagnarok.training.domain.Exercise;
import com.gymRagnarok.training.dto.ExerciseDTO;
import com.gymRagnarok.training.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    // Métodos de conversión
    private Exercise convertToEntity(ExerciseDTO.Request dto) {
        Exercise exercise = new Exercise();
        exercise.setName(dto.getName());
        exercise.setDescription(dto.getDescription());
        exercise.setSets(dto.getSets());
        exercise.setRepetitions(dto.getRepetitions());
        return exercise;
    }

    private ExerciseDTO.Response convertToResponseDTO(Exercise exercise) {
        ExerciseDTO.Response dto = new ExerciseDTO.Response();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setDescription(exercise.getDescription());
        dto.setSets(exercise.getSets());
        dto.setRepetitions(exercise.getRepetitions());
        return dto;
    }

    @Override
    public List<ExerciseDTO.Response> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ExerciseDTO.Response> getExerciseById(int id) {
        return exerciseRepository.findById(id)
                .map(this::convertToResponseDTO);
    }

    @Override
    public ExerciseDTO.Response createExercise(ExerciseDTO.Request exerciseDTO) {
        Exercise newExercise = convertToEntity(exerciseDTO);
        return convertToResponseDTO(exerciseRepository.save(newExercise));
    }

    @Override
    public ExerciseDTO.Response updateExercise(int id, ExerciseDTO.Request exerciseDTO) {
        return exerciseRepository.findById(id)
                .map(existing -> {
                    existing.setName(exerciseDTO.getName());
                    existing.setDescription(exerciseDTO.getDescription());
                    existing.setSets(exerciseDTO.getSets());
                    existing.setRepetitions(exerciseDTO.getRepetitions());
                    return convertToResponseDTO(exerciseRepository.save(existing));
                })
                .orElseThrow(() -> new RuntimeException("Exercise not found"));
    }

    @Override
    public void deleteExercise(int id) {
        exerciseRepository.deleteById(id);
    }

    @Override
    public List<ExerciseDTO.Response> searchByName(String name) {
        return exerciseRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExerciseDTO.Response> getBySets(int sets) {
        return exerciseRepository.findBySets(sets).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExerciseDTO.Response> getByRepetitions(int repetitions) {
        return exerciseRepository.findByRepetitions(repetitions).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
}