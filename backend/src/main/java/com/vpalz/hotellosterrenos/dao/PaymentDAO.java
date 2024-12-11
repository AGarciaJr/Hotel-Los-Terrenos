package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentDAO {
    private Long id;
    private BigDecimal balance;
    private String summary;
    private ReservationDAO reservation;
}
