package net.javaguides.ems.service;

import net.javaguides.ems.dao.ReservationDTO;
import net.javaguides.ems.dao.Response;
import java.time.LocalDate;

public interface ReservationService {
    Response createReservation(ReservationDTO reservationDTO);
    Response getUserReservations(Long userId);
    Response cancelReservation(Long reservationId);
    Response checkRoomAvailability(Long roomId, LocalDate checkIn, LocalDate checkOut);
}