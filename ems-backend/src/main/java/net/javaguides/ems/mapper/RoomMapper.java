package net.javaguides.ems.mapper;

import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.entity.Room;

public class RoomMapper {

    public static RoomDAO mapToRoomDAO(Room room) {

        room.getRoomType();

        return new RoomDAO(room.getId(), room.getRoomType(),
                room.getRoomPrice(), room.getRoomDescription(),
                room.getBooked(), room.getUserId()
        );
    }

    public static Room mapToRoom(RoomDAO roomDAO) {
        return new Room(roomDAO.getId(), roomDAO.getRoomType(),
                roomDAO.getRoomPrice(), roomDAO.getRoomDescription(),
                roomDAO.getBooked(), roomDAO.getUserId());
    }
}
