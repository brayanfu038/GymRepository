package com.gymRagnarok.person.repository;
import com.gymRagnarok.person.domain.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Integer> {
    
    // Puedes agregar métodos personalizados si lo necesitas, por ejemplo:

    List<Routine> findByRoutineNameContainingIgnoreCase(String routineName);

    List<Routine> findByFocusArea(String focusArea);
}
