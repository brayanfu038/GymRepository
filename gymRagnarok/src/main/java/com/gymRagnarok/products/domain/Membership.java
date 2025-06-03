package com.gymRagnarok.products.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "memberships")
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_membership", nullable = false)
    private TypeMembership typeMembership;  // Referencia al enum

    @Column(name = "init_date", nullable = false)
    private LocalDate initDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
 
    @Column(name = "value", nullable = false)
    private BigDecimal value;

    @ManyToMany
@JoinTable(
    name = "membership_products",
    joinColumns = @JoinColumn(name = "membership_id"),
    inverseJoinColumns = @JoinColumn(name = "product_id")
)
private Set<Product> products = new HashSet<>();


    public Membership() {
    }

  public Membership(TypeMembership typeMembership, LocalDate initDate, LocalDate endDate) {
    this.typeMembership = typeMembership;
    this.initDate = initDate;
    this.endDate = endDate;    
}
    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeMembership getTypeMembership() {
        return typeMembership;
    }

    public void setTypeMembership(TypeMembership typeMembership) {
        this.typeMembership = typeMembership;
    }

    public LocalDate getInitDate() {
        return initDate;
    }

    public void setInitDate(LocalDate initDate) {
        this.initDate = initDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}