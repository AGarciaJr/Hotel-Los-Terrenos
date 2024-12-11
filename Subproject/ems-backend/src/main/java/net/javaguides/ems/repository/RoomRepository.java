package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByRoomNumber(Integer roomNumber);

    Optional<Room> findByRoomNumber(Integer roomNumber);

    List<Room> findByRoomType(String roomType);

    List<Room> findByBooked(Boolean booked);

    @Query("SELECT r FROM Room r WHERE r.booked = false AND r.roomType = :roomType")
    List<Room> findAvailableRoomsByType(String roomType);

    boolean existsByUserId(String userId);

    Optional<Room> findByUserId(String userId);
}