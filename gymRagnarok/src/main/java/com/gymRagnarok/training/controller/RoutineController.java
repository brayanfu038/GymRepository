package com.gymRagnarok.training.controller;

import com.gymRagnarok.training.dto.RoutineDTO;
import com.gymRagnarok.training.service.RoutineService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {

    private final RoutineService routineService;

    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @GetMapping
    public List<RoutineDTO.Response> getAllRoutines() {
        return routineService.getAllRoutines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoutineDTO.Response> getRoutineById(@PathVariable int id) {
        return routineService.getRoutineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RoutineDTO.Response> createRoutine(
            @Valid @RequestBody RoutineDTO.Request routineDTO) {
        return ResponseEntity.status(201)
                .body(routineService.createRoutine(routineDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoutineDTO.Response> updateRoutine(
            @PathVariable int id,
            @Valid @RequestBody RoutineDTO.Request routineDTO) {
        return ResponseEntity.ok(routineService.updateRoutine(id, routineDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable int id) {
        routineService.deleteRoutine(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<RoutineDTO.Response> searchByRoutineName(@RequestParam String name) {
        return routineService.searchByRoutineName(name);
    }

    @GetMapping("/focus")
    public List<RoutineDTO.Response> getByFocusArea(@RequestParam String focusArea) {
        return routineService.getByFocusArea(focusArea);
    }
}