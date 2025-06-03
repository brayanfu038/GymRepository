package com.gymRagnarok.products.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@DiscriminatorValue("EDIBLE")
@Getter
@Setter
@NoArgsConstructor
public class EdibleProduct extends Product {

    private String batch;
    @Column(name = "expiration_date")
    private Date expirationDate;
}
