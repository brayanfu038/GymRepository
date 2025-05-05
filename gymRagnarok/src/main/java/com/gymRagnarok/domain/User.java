package com.gymRagnarok.domain;
import jakarta.persistence.*;
@Entity
@Table(name = "users")
public class User extends Person{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

  
    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    // Getters and Setters
   
    @Column(nullable = false)
    private String password;

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

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
}

