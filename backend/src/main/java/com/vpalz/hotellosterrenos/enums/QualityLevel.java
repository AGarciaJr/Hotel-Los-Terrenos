package com.vpalz.hotellosterrenos.enums;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public enum QualityLevel {
    EXECUTIVE(new BigDecimal("300.00")),
    BUSINESS(new BigDecimal("200.00")),
    COMFORT(new BigDecimal("150.00")),
    ECONOMY(new BigDecimal("100.00"));

    private final BigDecimal price;

    QualityLevel(BigDecimal price) {
        this.price = price;
    }

    /**
     * Calculates the final price by adding the base room price.
     *
     * @param basePrice The base price entered by the clerk.
     * @return The total price as the sum of the base price and the quality level price.
     */
    public BigDecimal calculateFinalPrice(BigDecimal basePrice) {
        if (basePrice == null) {
            throw new IllegalArgumentException("Base price cannot be null");
        }
        return price.add(basePrice);
    }
}
