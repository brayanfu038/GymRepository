package com.gymRagnarok.products.domain;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("CLOTHING")
@Getter
@Setter
@NoArgsConstructor
public class ClothingProduct extends Product {

    private String size;
    private String color;
    private String material;
    private String style;

}
