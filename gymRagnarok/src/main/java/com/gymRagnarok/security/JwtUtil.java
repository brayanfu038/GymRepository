package com.gymRagnarok.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")                
    private String secret;

    @Value("${jwt.expiration-ms}")          
    private long expirationMs;              

   public String generateToken(String username) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + expirationMs);
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(SignatureAlgorithm.HS512, secret.getBytes(StandardCharsets.UTF_8))
        .compact();
}

public String validateAndExtractUsername(String token) {
    return Jwts.parser()
        .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
}

public boolean isTokenValid(String token, UserDetails user) {
    try {
        String username = validateAndExtractUsername(token);
        return username.equals(user.getUsername());
    } catch (JwtException | IllegalArgumentException e) {
        return false;
    }
}
}
