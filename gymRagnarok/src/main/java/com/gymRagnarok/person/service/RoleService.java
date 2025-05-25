package com.gymRagnarok.person.service;

import com.gymRagnarok.exception.GlobalExceptionHandler.DuplicateRoleException;
import com.gymRagnarok.exception.GlobalExceptionHandler.RoleNotFoundException;
import com.gymRagnarok.person.domain.Permission;
import com.gymRagnarok.person.domain.Role;
import com.gymRagnarok.person.domain.RoleType;
import com.gymRagnarok.person.dto.RoleDTO;
import com.gymRagnarok.person.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public RoleDTO.Response createRole(RoleDTO.Request roleDTO) {
        // Convertir String a RoleType (ADMIN o STAFF)
        RoleType roleType = RoleType.valueOf(roleDTO.getType().toUpperCase());
        
        // Validar rol único
        roleRepository.findByType(roleType).ifPresent(r -> {
            throw new DuplicateRoleException("El tipo de rol ya existe");
        });

        // Convertir permisos (READ, CREATE, etc.)
        Set<Permission> permissions = roleDTO.getPermissions().stream()
                .map(p -> {
                    try {
                        return Permission.valueOf(p.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Permiso inválido: " + p);
                    }
                })
                .collect(Collectors.toSet());

        Role role = new Role();
        role.setType(roleType);
        role.setPermissions(permissions);
        
        Role savedRole = roleRepository.save(role);
        return convertToDTO(savedRole);
    }

    public RoleDTO.Response getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException("Rol no encontrado"));
        return convertToDTO(role);
    }

    public RoleDTO.Response updateRole(Long id, RoleDTO.Request roleDTO) {
        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException("Rol no encontrado"));

        // Actualizar tipo si es necesario
        if (roleDTO.getType() != null) {
            RoleType newType = RoleType.valueOf(roleDTO.getType().toUpperCase());
            if (!existingRole.getType().equals(newType)) {
                roleRepository.findByType(newType).ifPresent(r -> {
                    throw new DuplicateRoleException("El nuevo tipo de rol ya existe");
                });
                existingRole.setType(newType);
            }
        }

        // Actualizar permisos
        if (roleDTO.getPermissions() != null) {
            Set<Permission> permissions = roleDTO.getPermissions().stream()
                    .map(p -> Permission.valueOf(p.toUpperCase()))
                    .collect(Collectors.toSet());
            existingRole.setPermissions(permissions);
        }

        Role updatedRole = roleRepository.save(existingRole);
        return convertToDTO(updatedRole);
    }

    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException("Rol no encontrado"));
        if (!role.getUsers().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar un rol con usuarios asignados");
        }
        roleRepository.delete(role);
    }

    private RoleDTO.Response convertToDTO(Role role) {
        RoleDTO.Response dto = new RoleDTO.Response();
        dto.setId(role.getId());
        dto.setType(role.getType().name());
        dto.setPermissions(role.getPermissions().stream()
                .map(Permission::name)
                .collect(Collectors.toSet()));
        return dto;
    }
}