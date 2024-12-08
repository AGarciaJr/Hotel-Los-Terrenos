package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private String reservationConfirmationCode;

    private UserDAO user;
    private RoomDAO room;
    private ReservationDAO reservation;
    private FloorDAO floor;

    private List<UserDAO> userList;
    private List<RoomDAO> roomList;
    private List<ReservationDAO> reservationList;
    private List<FloorDAO> floorList;

    // Default constructor
    public Response() {
    }

    // Constructor with parameters
    public Response(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

}
