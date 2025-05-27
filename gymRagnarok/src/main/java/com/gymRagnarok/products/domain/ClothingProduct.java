package com.gymRagnarok.products.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("CLOTHING")
@Getter @Setter @NoArgsConstructor
public class ClothingProduct extends Product {

    private String size;
    private String color;
    private String material;
    private String style;

    /*public void displayDetails() {
        System.out.println("\nPrecio de compra: "
                + "Nombre: " + getName() + getPurchasePrice()
                + "\nPrecio de venta: " + getSalePrice()
                + "\nDescripción: " + getDescription()
                + "\nTamaño: " + size
                + "\nColor: " + color
                + "\nMaterial: " + material
                + "\nEstilo: " + style);
    }*/

  

}
