package com.gymRagnarok.training.service;

import com.gymRagnarok.training.domain.Exercise;
import com.gymRagnarok.training.domain.Routine;
import com.gymRagnarok.training.dto.ExerciseDTO;
import com.gymRagnarok.training.dto.RoutineDTO;
import com.gymRagnarok.training.repository.ExerciseRepository;
import com.gymRagnarok.training.repository.RoutineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoutineServiceImpl implements RoutineService {

    private final RoutineRepository routineRepository;
    private final ExerciseRepository exerciseRepository;

    public RoutineServiceImpl(RoutineRepository routineRepository,
                              ExerciseRepository exerciseRepository) {
        this.routineRepository = routineRepository;
        this.exerciseRepository = exerciseRepository;
    }

    private Routine convertToEntity(RoutineDTO.Request dto) {
        Routine routine = new Routine();
        routine.setRoutineName(dto.getRoutineName());
        routine.setFocusArea(dto.getFocusArea());
        routine.setDurationMin(dto.getDurationMin());
        routine.setNotes(dto.getNotes());
        routine.setStartTime(dto.getStartTime());
        routine.setEndTime(dto.getEndTime());

        // Obtener ejercicios desde la base de datos
        List<Exercise> exercises = exerciseRepository.findAllById(dto.getExerciseIds());
        routine.setExercises(exercises);

        return routine;
    }

    private RoutineDTO.Response convertToResponseDTO(Routine routine) {
        RoutineDTO.Response dto = new RoutineDTO.Response();
        dto.setId(routine.getId());
        dto.setRoutineName(routine.getRoutineName());
        dto.setFocusArea(routine.getFocusArea());
        dto.setDurationMin(routine.getDurationMin());
        dto.setNotes(routine.getNotes());
        dto.setStartTime(routine.getStartTime());
        dto.setEndTime(routine.getEndTime());

        // Convertir ejercicios a DTO
        List<ExerciseDTO.Response> exerciseDTOs = routine.getExercises().stream()
                .map(exercise -> {
                    ExerciseDTO.Response exerciseDTO = new ExerciseDTO.Response();
                    exerciseDTO.setId(exercise.getId());
                    exerciseDTO.setName(exercise.getName());
                    exerciseDTO.setDescription(exercise.getDescription());
                    exerciseDTO.setSets(exercise.getSets());
                    exerciseDTO.setRepetitions(exercise.getRepetitions());
                    return exerciseDTO;
                })
                .collect(Collectors.toList());

        dto.setExercises(exerciseDTOs);
        return dto;
    }

    @Override
    public List<RoutineDTO.Response> getAllRoutines() {
        return routineRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RoutineDTO.Response> getRoutineById(int id) {
        return routineRepository.findById(id)
                .map(this::convertToResponseDTO);
    }

    @Override
    public RoutineDTO.Response createRoutine(RoutineDTO.Request routineDTO) {
        Routine newRoutine = convertToEntity(routineDTO);
        return convertToResponseDTO(routineRepository.save(newRoutine));
    }

    @Override
    public RoutineDTO.Response updateRoutine(int id, RoutineDTO.Request routineDTO) {
        return routineRepository.findById(id)
                .map(existing -> {
                    existing.setRoutineName(routineDTO.getRoutineName());
                    existing.setFocusArea(routineDTO.getFocusArea());
                    existing.setDurationMin(routineDTO.getDurationMin());
                    existing.setNotes(routineDTO.getNotes());
                    existing.setStartTime(routineDTO.getStartTime());
                    existing.setEndTime(routineDTO.getEndTime());

                    List<Exercise> exercises = exerciseRepository.findAllById(routineDTO.getExerciseIds());
                    existing.setExercises(exercises);

                    return convertToResponseDTO(routineRepository.save(existing));
                })
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));
    }

    @Override
    public void deleteRoutine(int id) {
        routineRepository.deleteById(id);
    }

    @Override
    public List<RoutineDTO.Response> searchByRoutineName(String name) {
        return routineRepository.findByRoutineNameContainingIgnoreCase(name).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoutineDTO.Response> getByFocusArea(String focusArea) {
        return routineRepository.findByFocusArea(focusArea).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
}