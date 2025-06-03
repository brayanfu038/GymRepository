package com.gymRagnarok.products.controller;

import com.gymRagnarok.products.domain.Membership;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.domain.TypeMembership;
import com.gymRagnarok.products.dto.MembershipDTO;
import com.gymRagnarok.products.repository.ClothingProductRepository;
import com.gymRagnarok.products.repository.EdibleProductRepository;
import com.gymRagnarok.products.service.MembershipService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/memberships")
public class MembershipController {

    private final MembershipService membershipService;
    private final ClothingProductRepository clothingProductRepository;
    private final EdibleProductRepository edibleProductRepository;

    public MembershipController(MembershipService membershipService,
                               ClothingProductRepository clothingProductRepository,
                               EdibleProductRepository edibleProductRepository) {
        this.membershipService = membershipService;
        this.clothingProductRepository = clothingProductRepository;
        this.edibleProductRepository = edibleProductRepository;
    }

    @GetMapping
    public List<MembershipDTO> getAll() {
        return membershipService.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipDTO> getById(@PathVariable Long id) {
        return membershipService.findById(id)
                .map(membership -> ResponseEntity.ok(toDTO(membership)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MembershipDTO> create(@RequestBody MembershipDTO dto) {
        Set<Product> products = getProductsByIds(dto.getProductIds());
        Membership created = membershipService.createMembership(dto.getTypeMembership(), products);
        return ResponseEntity.ok(toDTO(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipDTO> update(@PathVariable Long id, @RequestBody MembershipDTO dto) {
        try {
            Set<Product> products = getProductsByIds(dto.getProductIds());
            Membership updated = new Membership(
                    dto.getTypeMembership(),
                    dto.getInitDate(),
                    dto.getEndDate()
            );
            updated.setId(id);
            updated.setProducts(products);

            Membership result = membershipService.update(id, updated);
            return ResponseEntity.ok(toDTO(result));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            membershipService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ---------------------
    // Métodos auxiliares
    // ---------------------

    private MembershipDTO toDTO(Membership membership) {
        Set<Long> productIds = membership.getProducts().stream()
                .map(Product::getId)
                .collect(Collectors.toSet());

        return new MembershipDTO(
                membership.getId(),
                membership.getTypeMembership(),
                membership.getInitDate(),
                membership.getEndDate(),
                membership.getValue(),
                productIds
        );
    }

    private Set<Product> getProductsByIds(Set<Long> ids) {
        if (ids == null || ids.isEmpty()) return new HashSet<>();
        
        Set<Product> products = new HashSet<>();
        products.addAll(clothingProductRepository.findAllById(ids));
        products.addAll(edibleProductRepository.findAllById(ids));
        
        if (products.size() != ids.size()) {
            Set<Long> foundIds = products.stream()
                    .map(Product::getId)
                    .collect(Collectors.toSet());
            Set<Long> missingIds = new HashSet<>(ids);
            missingIds.removeAll(foundIds);
            
            throw new EntityNotFoundException(
                "Productos no encontrados con IDs: " + missingIds
            );
        }
        
        return products;
    }
}