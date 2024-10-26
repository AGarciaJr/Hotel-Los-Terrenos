package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;

import java.util.Calendar;

public class CardInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardNumber;
    private String ccv;
    private Calendar expirationDate;

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", cardNumber='" + cardNumber + '\'' +
                ", ccv=" + ccv +
                ", expirationDate=" + expirationDate.toString() +
                '}';
    }
}
