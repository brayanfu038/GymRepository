package com.gymRagnarok.person.service;

import com.gymRagnarok.config.JwtUtil;
import com.gymRagnarok.exception.GlobalExceptionHandler;
import com.gymRagnarok.person.domain.Role;
import com.gymRagnarok.person.domain.User;
import com.gymRagnarok.person.dto.UserDTO;
import com.gymRagnarok.person.repository.RoleRepository;
import com.gymRagnarok.person.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder; // Usamos la interfaz en lugar de la implementación específica

    /**
     * Constructor con inyección de dependencias.
     */
    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Crea un nuevo usuario a partir del DTO recibido.
     */
    public UserDTO.Response createUser(UserDTO.Request userDTO) {
        validateUserRequest(userDTO);

        userRepository.findByUserName(userDTO.getUserName())
                .ifPresent(u -> {
                    throw new GlobalExceptionHandler.DuplicateUsernameException("El nombre de usuario ya está en uso");
                });

        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new GlobalExceptionHandler.RoleNotFoundException("Rol no encontrado"));

        User user = new User();
        user.setIdentificationNumber(userDTO.getIdentificationNumber());
        user.setNames(userDTO.getNames());
        user.setLastNames(userDTO.getLastNames());
        user.setTypeId(userDTO.getTypeId());
        user.setDateBirth(userDTO.getDateBirth());
        user.setNumberPhone(userDTO.getNumberPhone());
        user.setUserName(userDTO.getUserName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encriptar contraseña
        user.setRole(role);
        user.setCreatedDate(LocalDateTime.now());
        user.setActive(true);

        User savedUser = userRepository.save(user);
        return convertToResponseDTO(savedUser);
    }

    /**
     * Busca un usuario por su nombre de usuario.
     */
    public User findByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new GlobalExceptionHandler.UserNotFoundException("Usuario no encontrado"));
    }

    /**
     * Autentica un usuario y devuelve un token JWT si las credenciales son válidas.
     */
    public String authenticate(String username, String password) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new GlobalExceptionHandler.InvalidCredentialsException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new GlobalExceptionHandler.InvalidCredentialsException("Credenciales inválidas");
        }

        return jwtUtil.generateToken(username);
    }

    /**
     * Obtiene un usuario por su ID y lo convierte a DTO.
     */
    public UserDTO.Response getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.UserNotFoundException("Usuario no encontrado"));
        return convertToResponseDTO(user);
    }

    /**
     * Actualiza un usuario existente.
     */
    public UserDTO.Response updateUser(Long id, UserDTO.Request userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.UserNotFoundException("Usuario no encontrado"));

        if (userDTO.getUserName() != null && !userDTO.getUserName().equals(existingUser.getUserName())) {
            userRepository.findByUserName(userDTO.getUserName())
                    .ifPresent(u -> {
                        throw new GlobalExceptionHandler.DuplicateUsernameException("Nombre de usuario ya en uso");
                    });
            existingUser.setUserName(userDTO.getUserName());
        }

        if (userDTO.getRoleId() != null) {
            Role role = roleRepository.findById(userDTO.getRoleId())
                    .orElseThrow(() -> new GlobalExceptionHandler.RoleNotFoundException("Rol no encontrado"));
            existingUser.setRole(role);
        }

        if (userDTO.getNames() != null) existingUser.setNames(userDTO.getNames());
        if (userDTO.getLastNames() != null) existingUser.setLastNames(userDTO.getLastNames());
        if (userDTO.getNumberPhone() != null) existingUser.setNumberPhone(userDTO.getNumberPhone());
        if (userDTO.getDateBirth() != null) existingUser.setDateBirth(userDTO.getDateBirth());

        if (userDTO.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encriptar nueva contraseña
        }

        User updatedUser = userRepository.save(existingUser);
        return convertToResponseDTO(updatedUser);
    }

    /**
     * Desactiva (soft delete) un usuario por ID.
     */
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.UserNotFoundException("Usuario no encontrado"));
        user.setActive(false);
        userRepository.save(user);
    }

    /**
     * Valida campos obligatorios del DTO de usuario.
     */
    private void validateUserRequest(UserDTO.Request dto) {
        if (dto.getUserName() == null || dto.getUserName().isBlank()) {
            throw new GlobalExceptionHandler.MissingRequiredFieldException("El nombre de usuario es obligatorio");
        }
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new GlobalExceptionHandler.MissingRequiredFieldException("La contraseña es obligatoria");
        }
        if (dto.getRoleId() == null) {
            throw new GlobalExceptionHandler.MissingRequiredFieldException("El rol es obligatorio");
        }
    }

    /**
     * Convierte la entidad User a su correspondiente DTO de respuesta.
     */
    private UserDTO.Response convertToResponseDTO(User user) {
        UserDTO.Response response = new UserDTO.Response();
        response.setId(user.getId());
        response.setIdentificationNumber(user.getIdentificationNumber());
        response.setNames(user.getNames());
        response.setLastNames(user.getLastNames());
        response.setTypeId(user.getTypeId().name());
        response.setDateBirth(user.getDateBirth());
        response.setNumberPhone(user.getNumberPhone());
        response.setUserName(user.getUserName());
        response.setRoleId(user.getRole().getId());
        response.setCreatedDate(user.getCreatedDate());
        response.setActive(user.isActive());
        return response;
    }
}
