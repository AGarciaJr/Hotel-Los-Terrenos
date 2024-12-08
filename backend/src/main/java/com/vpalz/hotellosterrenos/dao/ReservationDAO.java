package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReservationDAO {
    private Long id;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private int numberOfChildren;
    private int numberOfAdults;
    private int totalNumberOfGuests;

    private String reservationConfirmationCode;

    private String status;

    private UserDAO user;
    private RoomDAO room;
}
