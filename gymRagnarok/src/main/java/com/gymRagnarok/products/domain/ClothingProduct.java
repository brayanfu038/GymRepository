package com.gymRagnarok.products.domain;


import java.math.BigDecimal;

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
	public void setStyle(String style2) {
		// TODO Auto-generated method stub
		
	}
	public void setMaterial(String material2) {
		// TODO Auto-generated method stub
		
	}
	public void setColor(String color2) {
		// TODO Auto-generated method stub
		
	}
	public void setSize(String size2) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setName(String name2) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setPurchasePrice(BigDecimal purchasePrice2) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setSalePrice(BigDecimal salePrice2) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setDescription(String description2) {
		// TODO Auto-generated method stub
		
	}
	public long getId() {
		// TODO Auto-generated method stub
		return 0;
	}
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}
	public BigDecimal getPurchasePrice() {
		// TODO Auto-generated method stub
		return null;
	}
	public BigDecimal getSalePrice() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getDescription() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getSize() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getColor() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getMaterial() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getStyle() {
		// TODO Auto-generated method stub
		return null;
	}

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
