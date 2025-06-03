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
	public void setExpirationDate(Date expirationDate2) {
		// TODO Auto-generated method stub
		
	}
	public void setBatch(String batch2) {
		// TODO Auto-generated method stub
		
	}
	public String getBatch() {
		// TODO Auto-generated method stub
		return null;
	}
	public Date getExpirationDate() {
		// TODO Auto-generated method stub
		return null;
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
