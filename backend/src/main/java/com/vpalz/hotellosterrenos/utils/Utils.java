package com.vpalz.hotellosterrenos.utils;

import com.vpalz.hotellosterrenos.dao.*;
import com.vpalz.hotellosterrenos.entity.*;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateConfirmationCode(int length){
        StringBuilder sb = new StringBuilder();

        for(int i = 0; i < length; i++){
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

    public static UserDAO mapUserEntityToUserDAO(User user){
        UserDAO userDAO = new UserDAO();

        userDAO.setId(user.getId());
        userDAO.setName(user.getName());
        userDAO.setEmail(user.getEmail());
        userDAO.setPhoneNumber(user.getPhoneNumber());
        userDAO.setRole(user.getRole());
        userDAO.setPassword(user.getPassword());

        if (user.getCorporation() != null) {
            userDAO.setCorporation(mapCorporationEntityToCorporationDAO(user.getCorporation()));
        }

        return userDAO;
    }

    public static User mapUserDAOToUser(UserDAO userDto) {
       User user = new User();

       user.setId(userDto.getId());
       user.setName(userDto.getName());
       user.setEmail(userDto.getEmail());
       user.setPhoneNumber(userDto.getPhoneNumber());
       user.setRole(userDto.getRole());

        return user;

    }

    public static RoomDAO mapRoomEntityToRoomDAO(Room room){
        RoomDAO roomDAO = new RoomDAO();

        roomDAO.setId(room.getId());
        roomDAO.setRoomType(room.getRoomType());
        roomDAO.setRoomPrice(room.getRoomPrice());
        roomDAO.setRoomDescription(room.getRoomDescription());

        return roomDAO;
    }

    public static ReservationDAO mapReservationEntityToReservationDAO(Reservation reservation){
        ReservationDAO reservationDAO = new ReservationDAO();

        reservationDAO.setId(reservation.getId());
        reservationDAO.setCheckInDate(reservation.getCheckInDate());
        reservationDAO.setCheckOutDate(reservation.getCheckOutDate());
        reservationDAO.setNumberOfAdults(reservation.getNumberOfAdults());
        reservationDAO.setNumberOfChildren(reservation.getNumberOfChildren());
        reservationDAO.setTotalNumberOfGuests(reservation.getTotalNumberOfGuests());
        reservationDAO.setReservationConfirmationCode(reservation.getReservationConfirmationCode());
        reservationDAO.setStatus(reservation.getStatus().toString());

        return reservationDAO;
    }

    public static RoomDAO mapRoomEntityToRoomDAOPlusReservations(Room room){
        RoomDAO roomDAO = new RoomDAO();

        roomDAO.setId(room.getId());
        roomDAO.setRoomNumber(room.getRoomNumber());
        roomDAO.setRoomType(room.getRoomType());
        roomDAO.setRoomPrice(room.getRoomPrice());
        roomDAO.setQualityLevel(room.getQualityLevel().toString());
        roomDAO.setBedType(room.getBedType().toString());
        roomDAO.setSmokingStatus(room.getSmokingStatus());
        roomDAO.setRoomDescription(room.getRoomDescription());

        if(room.getReservations() != null){
            roomDAO.setReservations(room.getReservations().stream()
                    .map(Utils::mapReservationEntityToReservationDAO)
                    .collect(Collectors.toList()));
        }

        return roomDAO;
    }

    public static UserDAO mapUserEntityToUserDAOPlusUserReservationsAndRoom(User user){
        UserDAO userDAO = new UserDAO();

        userDAO.setId(user.getId());
        userDAO.setName(user.getName());
        userDAO.setEmail(user.getEmail());
        userDAO.setPhoneNumber(user.getPhoneNumber());
        userDAO.setRole(user.getRole());

        if(!user.getReservations().isEmpty()){
            userDAO.setReservations(user.getReservations().stream()
                    .map(reservation -> mapReservationEntityToReservationDAOPlusReservedRooms(reservation, false))
                    .collect(Collectors.toList()));
        }

        return userDAO;
    }

    public static ReservationDAO mapReservationEntityToReservationDAOPlusReservedRooms(Reservation reservation, boolean mapUser) {
        ReservationDAO reservationDAO = mapReservationEntityToReservationDAO(reservation);

        if(mapUser){
            reservationDAO.setUser(Utils.mapUserEntityToUserDAO(reservation.getUser()));
        }
        if(reservation.getRoom() != null){
            RoomDAO roomDAO = new RoomDAO();

            roomDAO.setId(reservation.getRoom().getId());
            roomDAO.setRoomType(reservation.getRoom().getRoomType());
            roomDAO.setRoomPrice(reservation.getRoom().getRoomPrice());
            roomDAO.setRoomDescription(reservation.getRoom().getRoomDescription());

            reservationDAO.setRoom(roomDAO);
        }
        return reservationDAO;
    }

    public static UserDAO mapUserEntityToUserDAOPlusUserReservations(User user, List<ReservationDAO> activeReservations) {
        UserDAO userDAO = new UserDAO();
        userDAO.setId(user.getId());
        userDAO.setName(user.getName());
        userDAO.setEmail(user.getEmail());
        userDAO.setPhoneNumber(user.getPhoneNumber());

        List<ReservationDAO> reservationDAOs = activeReservations.stream()
                .map(reservation -> {
                    ReservationDAO reservationDAO = new ReservationDAO();
                    reservationDAO.setId(reservation.getId());
                    reservationDAO.setCheckInDate(reservation.getCheckInDate());
                    reservationDAO.setCheckOutDate(reservation.getCheckOutDate());
                    reservationDAO.setStatus(reservation.getStatus());
                    reservationDAO.setReservationConfirmationCode(reservation.getReservationConfirmationCode());
                    return reservationDAO;
                })
                .collect(Collectors.toList());

        userDAO.setReservations(reservationDAOs);

        return userDAO;
    }

    public static List<UserDAO> mapUserListEntityToUserDAOList(List<User> users){
        return users.stream().map(Utils::mapUserEntityToUserDAO).collect(Collectors.toList());
    }

    public static List<RoomDAO> mapRoomListEntityToRoomDAOList(List<Room> rooms){
        return rooms.stream().map(Utils::mapRoomEntityToRoomDAO).collect(Collectors.toList());
    }

    public static List<ReservationDAO> mapReservationListEntityToReservationDAOList(List<Reservation> reservations){
        return reservations.stream().map(Utils::mapReservationEntityToReservationDAO).collect(Collectors.toList());
    }

    public static FloorDAO mapFloorEntityToFloorDAO(Floor floor) {
        FloorDAO floorDAO = new FloorDAO();
        floorDAO.setId(floor.getId());
        floorDAO.setName(floor.getName());
        floorDAO.setTheme(floor.getTheme());
        floorDAO.setRooms(mapRoomListEntityToRoomDAOList(floor.getRooms()));
        return floorDAO;
    }

    public static List<FloorDAO> mapFloorListEntityToFloorDAOList(List<Floor> floors) {
        return floors.stream()
                .map(Utils::mapFloorEntityToFloorDAO)
                .collect(Collectors.toList());
    }

    public static CorporationDAO mapCorporationEntityToCorporationDAO(Corporation corporation) {
        CorporationDAO corporationDAO = new CorporationDAO();
        corporationDAO.setId(corporation.getId());
        corporationDAO.setName(corporation.getName());
        return corporationDAO;
    }

    public static List<CorporationDAO> mapCorporationListEntityToCorporationDAOList(List<Corporation> corporations) {
        return corporations.stream()
                .map(Utils::mapCorporationEntityToCorporationDAO)
                .collect(Collectors.toList());
    }
}
