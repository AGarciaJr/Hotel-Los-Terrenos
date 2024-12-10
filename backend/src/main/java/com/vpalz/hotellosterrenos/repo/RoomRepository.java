package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.Floor;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT res.room.id FROM Reservation res WHERE " +
            "(res.checkInDate <= :checkOutDate AND res.checkOutDate >= :checkInDate) AND " +
            "res.status NOT IN (:statuses)) AND r.roomType = :roomType")
    List<Room> findAvailableRoomsByDateAndType(LocalDate checkOutDate, LocalDate checkInDate, String roomType, List<ReservationStatus> statuses);



    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT res.room.id FROM Reservation res WHERE res.status = :bookedStatus)")
    List<Room> getAllAvailableRooms(@Param("bookedStatus") ReservationStatus bookedStatus);

    @Query("SELECT r FROM Room r WHERE r.roomType IN :roomTypes")
    List<Room> findRoomsByType(@Param("roomTypes") List<String> roomTypes);

    @Query("SELECT r FROM Room r WHERE r.roomType =:roomType AND r.floor IS NULL")
    List<Room> findRoomByType(String roomType);

    List<Room> findByFloor(Floor floor);

    boolean existsByRoomNumber(int roomNumber);
}