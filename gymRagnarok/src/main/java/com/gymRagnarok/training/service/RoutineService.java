package com.gymRagnarok.training.service;

import com.gymRagnarok.training.dto.RoutineDTO;

import java.util.List;
import java.util.Optional;

public interface RoutineService {
    List<RoutineDTO.Response> getAllRoutines();

    Optional<RoutineDTO.Response> getRoutineById(int id);

    RoutineDTO.Response createRoutine(RoutineDTO.Request routineDTO);

    RoutineDTO.Response updateRoutine(int id, RoutineDTO.Request routineDTO);

    void deleteRoutine(int id);

    List<RoutineDTO.Response> searchByRoutineName(String name);

    List<RoutineDTO.Response> getByFocusArea(String focusArea);
}