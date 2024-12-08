package net.javaguides.ems.service;

import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.entity.Room;

import java.util.List;

public interface RoomService {
    RoomDAO createRoom(RoomDAO RoomDAO);

    RoomDAO getRoomById(Long roomId);

    List<RoomDAO> getAllRooms();

    RoomDAO updateRoom(Long roomId, RoomDAO updatedRoom);

    void deleteRoom(Long roomId);
}
