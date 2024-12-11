package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Reservation;

public interface IReservationService {
    Response saveReservation(Long roomId, Long userId, Reservation reservation);

    Response findReservationByConfirmationCode(String confirmationCode);

    Response getAllReservations();

    Response cancelReservation(Long reservationId);

    Response checkoutReservation(Long reservationId);

    Response updateReservationByConfirmationCode(String confirmationCode, Reservation updatedReservation);

    Response checkInReservation(Long reservationId);
}
