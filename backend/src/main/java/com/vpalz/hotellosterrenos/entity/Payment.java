package com.vpalz.hotellosterrenos.entity;

import com.vpalz.hotellosterrenos.dao.ReservationDAO;
import jakarta.persistence.*;

import java.math.BigDecimal;


public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;
    private BigDecimal balance;
    private String summary;
    private ReservationDAO reservation;


    @Override
    public String toString() {
        return summary;
    }
}
