package com.vpalz.hotellosterrenos.entity;

import com.vpalz.hotellosterrenos.entity.Reservation;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ReservationTest {

    private Reservation reservation;

    @BeforeEach
    void setUp() {
        reservation = new Reservation();
        reservation.setId(1L);
        reservation.setCheckInDate(LocalDate.of(2024, 11, 1));
        reservation.setCheckOutDate(LocalDate.of(2024, 11, 5));
        reservation.setNumberOfAdults(2);
        reservation.setNumberOfChildren(1);
        reservation.setReservationConfirmationCode("CONF123456");
    }

    @Test
    void testGettersAndSetters() {
        assertEquals(1L, reservation.getId());
        assertEquals(LocalDate.of(2024, 11, 1), reservation.getCheckInDate());
        assertEquals(LocalDate.of(2024, 11, 5), reservation.getCheckOutDate());
        assertEquals(2, reservation.getNumberOfAdults());
        assertEquals(1, reservation.getNumberOfChildren());
        assertEquals("CONF123456", reservation.getReservationConfirmationCode());
    }

    @Test
    void testCalculateTotalNumberOfGuests() {
        reservation.calculateTotalNumberOfGuests();
        assertEquals(3, reservation.getTotalNumberOfGuests());
    }

    @Test
    void testSetNumberOfAdults() {
        reservation.setNumberOfAdults(3);
        assertEquals(3, reservation.getNumberOfAdults());
        assertEquals(4, reservation.getTotalNumberOfGuests()); // Updated total guests
    }

    @Test
    void testSetNumberOfChildren() {
        reservation.setNumberOfChildren(2);
        assertEquals(2, reservation.getNumberOfChildren());
        assertEquals(4, reservation.getTotalNumberOfGuests()); // Updated total guests
    }

    @Test
    void testToString() {
        String expected = "Reservation{id=1, checkInDate=2024-11-01, checkOutDate=2024-11-05, numberOfAdults=2, numberOfChildren=1, totalNumberOfGuests=3, reservationConfirmationCode='CONF123456'}";
        reservation.calculateTotalNumberOfGuests();
        assertEquals(expected, reservation.toString());
    }

    @Test
    void testAssociationWithUserAndRoom() {
        User user = new User();
        user.setId(10L);

        Room room = new Room();
        room.setId(5L);

        reservation.setUser(user);
        reservation.setRoom(room);

        assertEquals(10L, reservation.getUser().getId());
        assertEquals(5L, reservation.getRoom().getId());
    }
}
