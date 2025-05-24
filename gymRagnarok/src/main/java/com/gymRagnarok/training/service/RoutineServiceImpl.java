package com.gymRagnarok.training.service;


import com.gymRagnarok.training.domain.Routine;
import com.gymRagnarok.training.repository.RoutineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineServiceImpl implements RoutineService {

    private final RoutineRepository routineRepository;

    @Autowired
    public RoutineServiceImpl(RoutineRepository routineRepository) {
        this.routineRepository = routineRepository;
    }

    @Override
    public List<Routine> getAllRoutines() {
        return routineRepository.findAll();
    }

    @Override
    public Optional<Routine> getRoutineById(int id) {
        return routineRepository.findById(id);
    }

    @Override
    public Routine createRoutine(Routine routine) {
        return routineRepository.save(routine);
    }

    @Override
    public Routine updateRoutine(int id, Routine updatedRoutine) {
        return routineRepository.findById(id)
                .map(existing -> {
                    existing.setRoutineName(updatedRoutine.getRoutineName());
                    existing.setFocusArea(updatedRoutine.getFocusArea());
                    existing.setDurationMin(updatedRoutine.getDurationMin());
                    existing.setNotes(updatedRoutine.getNotes());
                    existing.setStartTime(updatedRoutine.getStartTime());
                    existing.setEndTime(updatedRoutine.getEndTime());
                    existing.setExercises(updatedRoutine.getExercises());
                    return routineRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Routine not found with id " + id));
    }

    @Override
    public void deleteRoutine(int id) {
        if (!routineRepository.existsById(id)) {
            throw new RuntimeException("Routine not found with id " + id);
        }
        routineRepository.deleteById(id);
    }

    @Override
    public List<Routine> searchByRoutineName(String name) {
        return routineRepository.findByRoutineNameContainingIgnoreCase(name);
    }

    @Override
    public List<Routine> getByFocusArea(String focusArea) {
        return routineRepository.findByFocusArea(focusArea);
    }
}
