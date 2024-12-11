package net.javaguides.ems.service;

import net.javaguides.ems.dao.RoomDAO;
import java.util.List;

public interface RoomService {
    RoomDAO createRoom(RoomDAO roomDAO);

    RoomDAO getRoomById(Long roomId);

    List<RoomDAO> getAllRooms();

    List<RoomDAO> getAvailableRooms();

    List<RoomDAO> getAvailableRoomsByType(String roomType);

    RoomDAO updateRoom(Long roomId, RoomDAO updatedRoom);

    RoomDAO bookRoom(Long roomId, String userId);

    void deleteRoom(Long roomId);

    boolean isRoomAvailable(Long roomId);

    boolean validateRoomNumber(Integer roomNumber);
}