package com.gymRagnarok.products.service;

import com.gymRagnarok.products.domain.Membership;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.domain.TypeMembership;
import com.gymRagnarok.products.factory.MembershipFactory;
import com.gymRagnarok.products.repository.MembershipRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;

    public MembershipService(MembershipRepository membershipRepository) {
        this.membershipRepository = membershipRepository;
    }

    public List<Membership> findAll() {
        return membershipRepository.findAll();
    }

    public Optional<Membership> findById(Long id) {
        return membershipRepository.findById(id);
    }

   public Membership createMembership(TypeMembership type, Set<Product> products) {
    Membership membership = MembershipFactory.createMembership(type, products);
    return membershipRepository.save(membership);
}

public Membership update(Long id, Membership updatedMembership) {
    Membership existing = membershipRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Membership not found with id: " + id));

    existing.setTypeMembership(updatedMembership.getTypeMembership());
    existing.setInitDate(updatedMembership.getInitDate());
    existing.setEndDate(updatedMembership.getEndDate());
    existing.setProducts(updatedMembership.getProducts());

    // Recalcular el valor basado en los productos actuales
    existing.setValue(MembershipFactory.calculateValue(existing.getProducts()));

    return membershipRepository.save(existing);
}

    public void delete(Long id) {
        if (!membershipRepository.existsById(id)) {
            throw new EntityNotFoundException("Membership not found with id: " + id);
        }
        membershipRepository.deleteById(id);
    }

    public List<Membership> findByType(TypeMembership type) {
        return membershipRepository.findByTypeMembership(type);
    }
}
