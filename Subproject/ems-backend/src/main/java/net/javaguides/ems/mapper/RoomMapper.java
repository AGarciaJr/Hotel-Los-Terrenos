package net.javaguides.ems.mapper;

import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.entity.Room;

public class RoomMapper {

    public static RoomDAO mapToRoomDAO(Room room) {
        RoomDAO roomDAO = new RoomDAO();
        roomDAO.setId(room.getId());
        roomDAO.setRoomNumber(room.getRoomNumber());
        roomDAO.setRoomType(room.getRoomType());
        roomDAO.setQualityLevel(room.getQualityLevel());
        roomDAO.setBedType(room.getBedType());
        roomDAO.setSmokingStatus(room.getSmokingStatus());
        roomDAO.setRoomPrice(room.getRoomPrice());
        roomDAO.setRoomDescription(room.getRoomDescription());
        roomDAO.setBooked(room.getBooked());
        roomDAO.setUserId(room.getUserId());
        roomDAO.setBookingDate(room.getBookingDate());
        return roomDAO;
    }

    public static Room mapToRoom(RoomDAO roomDAO) {
        Room room = new Room();
        room.setId(roomDAO.getId());
        room.setRoomNumber(roomDAO.getRoomNumber());
        room.setRoomType(roomDAO.getRoomType());
        room.setQualityLevel(roomDAO.getQualityLevel());
        room.setBedType(roomDAO.getBedType());
        room.setSmokingStatus(roomDAO.getSmokingStatus());
        room.setRoomPrice(roomDAO.getRoomPrice());
        room.setRoomDescription(roomDAO.getRoomDescription());
        room.setBooked(roomDAO.getBooked());
        room.setUserId(roomDAO.getUserId());
        room.setBookingDate(roomDAO.getBookingDate());
        return room;
    }
}