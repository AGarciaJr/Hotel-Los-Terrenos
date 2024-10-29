package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoomId(Long roomId);

    Optional<Reservation> findByReservationConfirmationCode(String confirmationCode);

    List<Reservation> findByUserId(Long userId);
}
