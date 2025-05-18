package com.gymRagnarok.person.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@PrimaryKeyJoinColumn(name = "id")
public class User extends Person {

    @Column(name = "user_name", length = 50)
    private String userName;

    @Column(nullable = false, length = 100)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // Getters y Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
