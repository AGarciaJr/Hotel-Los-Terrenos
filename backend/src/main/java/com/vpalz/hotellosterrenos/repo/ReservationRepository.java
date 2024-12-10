package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.dao.ReservationDAO;
import com.vpalz.hotellosterrenos.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findByRoomId(Long roomId);

    Optional<Reservation> findByReservationConfirmationCode(String confirmationCode);

    @Query("SELECT res FROM Reservation res WHERE res.user.id = :userId AND res.status = 'BOOKED'")
    List<Reservation> findActiveReservationsByUserId(Long userId);

}
