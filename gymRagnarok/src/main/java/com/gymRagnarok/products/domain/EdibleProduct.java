package com.gymRagnarok.products.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
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
	public void setBatch(String batch2) {
		// TODO Auto-generated method stub
		
	}
	public void setExpirationDate(Date expirationDate2) {
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
	public String getBatch() {
		// TODO Auto-generated method stub
		return null;
	}
	public Date getExpirationDate() {
		// TODO Auto-generated method stub
		return null;
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

    /*public void displayDetails(){
        System.out.println("Nombre: " + getName()
                + "\nPrecio de compra: " + getPurchasePrice()
                + "\nPrecio de venta: " + getSalePrice()
                + "\nDescripción: " + getDescription()
                + "\nLote: " + batch
                + "\nFecha de expiración: " + expirationDate);
    }*/
}
