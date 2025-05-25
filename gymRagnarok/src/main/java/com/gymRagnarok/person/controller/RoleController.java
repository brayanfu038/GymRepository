package com.gymRagnarok.person.controller;

import com.gymRagnarok.person.dto.RoleDTO;
import com.gymRagnarok.person.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<RoleDTO.Response> createRole(@Valid @RequestBody RoleDTO.Request roleDTO) {
        RoleDTO.Response createdRole = roleService.createRole(roleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO.Response> getRoleById(@PathVariable Long id) {
        RoleDTO.Response role = roleService.getRoleById(id);
        return ResponseEntity.ok(role);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO.Response> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody RoleDTO.Request roleDTO) {
        RoleDTO.Response updatedRole = roleService.updateRole(id, roleDTO);
        return ResponseEntity.ok(updatedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}