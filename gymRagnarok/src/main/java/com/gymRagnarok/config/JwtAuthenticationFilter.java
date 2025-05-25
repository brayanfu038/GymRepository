package com.gymRagnarok.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gymRagnarok.person.domain.User;
import com.gymRagnarok.person.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro de autenticación JWT que se ejecuta una vez por petición.
 * Valida el token JWT, extrae el usuario y establece la autenticación
 * en el contexto de seguridad de Spring.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    /**
     * Constructor con inyección de dependencias.
     * Se usa @Lazy para evitar referencia circular con UserService.
     *
     * @param jwtUtil utilidad para validación de tokens JWT
     * @param userService servicio para obtener usuarios
     */
    public JwtAuthenticationFilter(JwtUtil jwtUtil, @Lazy UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /**
     * Define las rutas que no deben ser filtradas (por ejemplo, /auth/**).
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }

    /**
     * Filtro principal: valida el token JWT y establece la autenticación si es válido.
     */
    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = header.substring(7); // Quita el "Bearer "
            String username = jwtUtil.validateAndExtractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userService.findByUsername(username);

                List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                if (user.getRole() != null) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getType().name()));
                }

                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(user, null, authorities);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            // En caso de token inválido, devuelve error 401
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
