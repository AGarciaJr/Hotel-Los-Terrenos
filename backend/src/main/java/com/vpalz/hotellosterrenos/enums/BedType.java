package com.vpalz.hotellosterrenos.enums;

import lombok.Getter;

/**
 * Represents different types of beds available in a hotel room.
 * Each bed type is associated with the number of beds typically provided in a room of that type.
 */
@Getter
public enum BedType {

    /**
     * Twin bed configuration, typically providing two twin beds in a room.
     */
    TWIN(2),

    /**
     * Full bed configuration, typically providing two full-sized beds in a room.
     */
    FULL(2),

    /**
     * Queen bed configuration, typically providing one queen-sized bed in a room.
     */
    QUEEN(1),

    /**
     * King bed configuration, typically providing one king-sized bed in a room.
     */
    KING(1);

    /**
     * The number of beds typically associated with the bed type.
     */
    private final Integer amount;

    /**
     * Constructor for the BedType enum, initializing it with the number of beds.
     *
     * @param amount The number of beds typically associated with the bed type.
     */
    BedType(Integer amount) {
        this.amount = amount;
    }
}
