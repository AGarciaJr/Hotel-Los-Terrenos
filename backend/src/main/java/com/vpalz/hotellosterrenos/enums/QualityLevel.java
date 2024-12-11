package com.vpalz.hotellosterrenos.enums;

import lombok.Getter;

import java.math.BigDecimal;

/**
 * Represents the quality level of a room, which determines its additional price.
 * Each quality level has an associated price that is added to the base room price.
 */
@Getter
public enum QualityLevel {

    /**
     * Executive level with the highest additional price of 300.00.
     */
    EXECUTIVE(new BigDecimal("300.00")),

    /**
     * Business level with an additional price of 200.00.
     */
    BUSINESS(new BigDecimal("200.00")),

    /**
     * Comfort level with an additional price of 150.00.
     */
    COMFORT(new BigDecimal("150.00")),

    /**
     * Economy level with the lowest additional price of 100.00.
     */
    ECONOMY(new BigDecimal("100.00"));

    /**
     * The additional price associated with the quality level.
     */
    private final BigDecimal price;

    /**
     * Constructor for the QualityLevel enum, initializing it with a specific price.
     *
     * @param price The additional price associated with the quality level.
     */
    QualityLevel(BigDecimal price) {
        this.price = price;
    }

    /**
     * Calculates the final price of a room by adding the base room price to the quality level price.
     *
     * @param basePrice The base price entered by the clerk.
     * @return The total price, calculated as the sum of the base price and the quality level price.
     * @throws IllegalArgumentException if the base price is null.
     */
    public BigDecimal calculateFinalPrice(BigDecimal basePrice) {
        if (basePrice == null) {
            throw new IllegalArgumentException("Base price cannot be null");
        }
        return price.add(basePrice);
    }
}
