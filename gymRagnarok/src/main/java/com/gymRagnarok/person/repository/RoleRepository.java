package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.Role;
import com.gymRagnarok.person.domain.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByType(RoleType type);
}