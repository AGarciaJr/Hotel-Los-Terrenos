package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

public class PaymentDAO {

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public class RoomDAO {
        private Long id;
        private BigDecimal balance;
        private String summary;
        private ReservationDAO reservation;
    }
}
