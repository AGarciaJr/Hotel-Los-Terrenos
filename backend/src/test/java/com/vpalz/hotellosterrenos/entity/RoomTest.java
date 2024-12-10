package com.vpalz.hotellosterrenos.entity;

import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.entity.Reservation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RoomTest {

    private Room room;

    @BeforeEach
    void setUp() {
        room = new Room();
        room.setId(1L);
        room.setRoomType("Suite");
        room.setRoomPrice(BigDecimal.valueOf(199.99));
        room.setRoomDescription("Luxury suite with ocean view.");
    }

    @Test
    void testGettersAndSetters() {
        assertEquals(1L, room.getId());
        assertEquals("Suite", room.getRoomType());
        assertEquals(BigDecimal.valueOf(199.99), room.getRoomPrice());
        assertEquals("Luxury suite with ocean view.", room.getRoomDescription());
    }

    @Test
    void testReservations() {
        assertNotNull(room.getReservations());
        assertTrue(room.getReservations().isEmpty());

        Reservation reservation = new Reservation();
        reservation.setId(100L);
        room.getReservations().add(reservation);

        List<Reservation> reservations = room.getReservations();
        assertEquals(1, reservations.size());
        assertEquals(100L, reservations.get(0).getId());
    }

    @Test
    void testToString() {
        String expected = "Room{id=1, roomType='Suite', roomPrice=199.99, roomDescription='Luxury suite with ocean view.', reservations=[]}";
        assertEquals(expected, room.toString());
    }
}
