package com.gymRagnarok.products.dto;

import com.gymRagnarok.products.domain.TypeMembership;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public class MembershipDTO {

    private Long id;
    private TypeMembership typeMembership;
    private LocalDate initDate;
    private LocalDate endDate;
    private BigDecimal value;
    private Set<Long> productIds;

    public MembershipDTO() {
    }

    public MembershipDTO(Long id, TypeMembership typeMembership, LocalDate initDate, LocalDate endDate,
                         BigDecimal value, Set<Long> productIds) {
        this.id = id;
        this.typeMembership = typeMembership;
        this.initDate = initDate;
        this.endDate = endDate;
        this.value = value;
        this.productIds = productIds;
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

    public Set<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(Set<Long> productIds) {
        this.productIds = productIds;
    }
}
