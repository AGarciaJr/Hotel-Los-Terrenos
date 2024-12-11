package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Calendar;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CardInfoDAO {
    private Long id;
    private String cardNumber;
    private String ccv;
    private Calendar reservation;
}
