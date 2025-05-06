package com.gymRagnarok.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@DiscriminatorValue("USERS")
@PrimaryKeyJoinColumn(name = "id")
public class User extends Person {

    @Id
    private Long id;

    @Column(nullable = false, length = 100)
    private String password;

    // Getters y Setters

    @Override
    public Long getId() {
        return id;
    }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}