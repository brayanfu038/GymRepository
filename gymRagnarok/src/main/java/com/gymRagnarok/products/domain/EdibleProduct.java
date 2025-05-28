package com.gymRagnarok.products.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("EDIBLE")
@Getter @Setter @NoArgsConstructor
public class EdibleProduct extends Product {

    private String batch;
    @Column(name = "expiration_date")
    private LocalDate expirationDate;
	public void setBatch(String batch2) {
		// TODO Auto-generated method stub
		
	}
	public void setExpirationDate1(LocalDate expirationDate2) {
		// TODO Auto-generated method stub
		
	}
	public void setExpirationDate(LocalDate expirationDate2) {
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
	public void setDescription(String description2) {
		// TODO Auto-generated method stub
		
	}

    /*public void displayDetails(){
        System.out.println("Nombre: " + getName()
                + "\nPrecio de compra: " + getPurchasePrice()
                + "\nPrecio de venta: " + getSalePrice()
                + "\nDescripción: " + getDescription()
                + "\nLote: " + batch
                + "\nFecha de expiración: " + expirationDate);
    }*/
}
