package com.gymRagnarok.training.service;



import java.util.List;
import java.util.Optional;

import com.gymRagnarok.training.domain.Routine;

public interface RoutineService {

    List<Routine> getAllRoutines();

    Optional<Routine> getRoutineById(int id);

    Routine createRoutine(Routine routine);

    Routine updateRoutine(int id, Routine updatedRoutine);

    void deleteRoutine(int id);

    List<Routine> searchByRoutineName(String name);

    List<Routine> getByFocusArea(String focusArea);
}
