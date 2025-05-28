package com.gymRagnarok.products.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
@Getter @Setter @NoArgsConstructor
public abstract class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(name = "purchase_price",nullable = false)
    private BigDecimal purchasePrice;
    @Column(name = "sale_price", nullable = false)
    private BigDecimal salePrice;
    private String description;

    public BigDecimal calculateUnitProfit(){
        return salePrice.subtract(purchasePrice);
    };
    public BigDecimal calculateTotalProfit(int salesQuantity) {
        return calculateUnitProfit().multiply(BigDecimal.valueOf(salesQuantity));
    }
	public abstract void setName(String name2);
	public abstract void setPurchasePrice(BigDecimal purchasePrice2);
	public void setSalePrice(BigDecimal salePrice2) {
		// TODO Auto-generated method stub
		
	}
	public abstract void setDescription(String description2);;

}
