package com.vpalz.hotellosterrenos.enums;

import lombok.Getter;

@Getter
public enum BedType {
    TWIN(2),
    FULL(2),
    QUEEN(1),
    KING(1);

    private final Integer amount;

    BedType(Integer amount) {
        this.amount = amount;
    }

}
