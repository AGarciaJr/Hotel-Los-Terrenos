package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    boolean existsByRoomId(Long roomId);

    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND r.isCanceled = false " +
            "AND ((r.checkInDate BETWEEN :checkIn AND :checkOut) OR " +
            "(r.checkOutDate BETWEEN :checkIn AND :checkOut))")
    List<Reservation> findOverlappingReservations(
            @Param("roomId") Long roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

}