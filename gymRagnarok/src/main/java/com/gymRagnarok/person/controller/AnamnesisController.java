package com.gymRagnarok.person.controller;

import com.gymRagnarok.person.dto.AnamnesisDTO;
import com.gymRagnarok.person.service.AnamnesisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anamnesis")
@CrossOrigin(origins = "http://localhost:5173")
public class AnamnesisController {

    private final AnamnesisService anamnesisService;

    public AnamnesisController(AnamnesisService anamnesisService) {
        this.anamnesisService = anamnesisService;
    }

    @PostMapping
    public ResponseEntity<AnamnesisDTO.Response> createAnamnesis(
            @RequestBody AnamnesisDTO.Request dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(anamnesisService.createAnamnesis(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnamnesisDTO.Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok(anamnesisService.getAnamnesisById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AnamnesisDTO.Response>> getByCustomer(
            @PathVariable Long customerId) {
        return ResponseEntity.ok(anamnesisService.getByCustomerId(customerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnamnesisDTO.Response> updateAnamnesis(
            @PathVariable Long id,
            @RequestBody AnamnesisDTO.Request dto) {
        return ResponseEntity.ok(anamnesisService.updateAnamnesis(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnamnesis(@PathVariable Long id) {
        anamnesisService.deleteAnamnesis(id);
        return ResponseEntity.noContent().build();
    }
}