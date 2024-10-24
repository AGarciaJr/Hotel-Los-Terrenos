package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDAO {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String roomDescription;
    private List<ReservationDAO> reservations;
}
