package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDAO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String role;
    private String password;
    private List<ReservationDAO> reservations = new ArrayList<>();
}
