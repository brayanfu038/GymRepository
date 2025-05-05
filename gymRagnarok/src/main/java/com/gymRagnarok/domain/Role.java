package com.gymRagnarok.domain;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String roleName;
    
    @ElementCollection(fetch = FetchType.EAGER, targetClass = Permission.class)
    @CollectionTable(
        name = "role_permission",
        joinColumns = @JoinColumn(name = "role_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private Set<Permission> permissionList;

    // Constructores
    public Role() {}

    public Role(String roleName, Set<Permission> permissionList) {
        this.roleName = roleName;
        this.permissionList = permissionList;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<Permission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(Set<Permission> permissionList) {
        this.permissionList = permissionList;
    }
}
