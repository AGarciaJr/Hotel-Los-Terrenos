package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.RoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface RoomBookingRepository extends JpaRepository<RoomBooking, Long> {
    // Add the missing findByUserId method
    List<RoomBooking> findByUserId(Long userId);

    // Existing overlapping bookings query
    @Query("SELECT rb FROM RoomBooking rb WHERE rb.room.id = :roomId AND " +
            "((rb.checkInDate BETWEEN :checkIn AND :checkOut) OR " +
            "(rb.checkOutDate BETWEEN :checkIn AND :checkOut) OR " +
            "(:checkIn BETWEEN rb.checkInDate AND rb.checkOutDate)) AND " +
            "rb.status = 'CONFIRMED'")
    List<RoomBooking> findOverlappingBookings(
            @Param("roomId") Long roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

    // Additional useful queries
    List<RoomBooking> findByRoomId(Long roomId);
    List<RoomBooking> findByStatus(String status);
    List<RoomBooking> findByCheckInDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT rb FROM RoomBooking rb WHERE rb.user.id = :userId AND rb.status = :status")
    List<RoomBooking> findByUserIdAndStatus(@Param("userId") Long userId, @Param("status") String status);

    // Find bookings by confirmation code
    RoomBooking findByConfirmationCode(String confirmationCode);
}