package com.gymRagnarok.products.factory;

import com.gymRagnarok.products.domain.Membership;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.domain.TypeMembership;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class MembershipFactory {

    public static Membership createMembership(TypeMembership type, Set<Product> products) {
        LocalDate initDate = LocalDate.now();
        LocalDate endDate = calculateEndDate(initDate, type);
        BigDecimal value = calculateValue(products);

        Membership membership = new Membership(type, initDate, endDate);
        membership.setProducts(products != null ? products : new HashSet<>());
        membership.setValue(value);

        return membership;
    }

    public static LocalDate calculateEndDate(LocalDate startDate, TypeMembership type) {
        return switch (type) {
            case MENSUAL -> startDate.plusMonths(1);
            case TRIMESTRAL -> startDate.plusMonths(3);
            case SEMESTRAL -> startDate.plusMonths(6);
            case ANUAL -> startDate.plusYears(1);
        };
    }

    public static BigDecimal calculateValue(Set<Product> products) {
        if (products == null || products.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return products.stream()
                .map(Product::getSalePrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}