package com.gymRagnarok.person.controller;
import com.gymRagnarok.person.domain.Routine;
import com.gymRagnarok.person.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {

    private final RoutineService routineService;

    @Autowired
    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @GetMapping
    public List<Routine> getAllRoutines() {
        return routineService.getAllRoutines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Routine> getRoutineById(@PathVariable int id) {
        return routineService.getRoutineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Routine createRoutine(@RequestBody Routine routine) {
        return routineService.createRoutine(routine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Routine> updateRoutine(@PathVariable int id, @RequestBody Routine routine) {
        try {
            return ResponseEntity.ok(routineService.updateRoutine(id, routine));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable int id) {
        try {
            routineService.deleteRoutine(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Routine> searchByRoutineName(@RequestParam String name) {
        return routineService.searchByRoutineName(name);
    }

    @GetMapping("/focus")
    public List<Routine> getByFocusArea(@RequestParam String focusArea) {
        return routineService.getByFocusArea(focusArea);
    }
}
