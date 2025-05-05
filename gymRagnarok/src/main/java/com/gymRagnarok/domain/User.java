package com.gymRagnarok.domain;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("USER")
public class User extends Person {

    @Column(name = "user_name", nullable = false, unique = true, length = 50)
    private String userName;

    @Column(nullable = false, length = 100)
    private String password;

    // Getters y Setters
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}