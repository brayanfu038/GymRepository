package com.gymRagnarok.products.repository;

import com.gymRagnarok.products.domain.Membership;
import com.gymRagnarok.products.domain.TypeMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByTypeMembership(TypeMembership typeMembership);
}
