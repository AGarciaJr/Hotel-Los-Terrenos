package net.javaguides.ems.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.entity.Room;
import net.javaguides.ems.enums.RoomEnums;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.exception.RoomException;
import net.javaguides.ems.mapper.RoomMapper;
import net.javaguides.ems.repository.RoomRepository;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.RoomService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    private RoomRepository roomRepository;
    private UserRepository userRepository;

    @Override
    public RoomDAO createRoom(RoomDAO roomDAO) {
        validateRoomData(roomDAO);

        if (roomRepository.existsByRoomNumber(roomDAO.getRoomNumber())) {
            throw new RoomException.InvalidRoomDataException("Room number already exists");
        }

        Room room = RoomMapper.mapToRoom(roomDAO);
        room.setBooked(false); // Ensure new rooms start as available
        Room savedRoom = roomRepository.save(room);

        return RoomMapper.mapToRoomDAO(savedRoom);
    }

    @Override
    public RoomDAO getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomException.RoomNotFoundException("Room not found with id " + roomId));
        return RoomMapper.mapToRoomDAO(room);
    }

    @Override
    public List<RoomDAO> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream()
                .map(RoomMapper::mapToRoomDAO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomDAO> getAvailableRooms() {
        List<Room> rooms = roomRepository.findByBooked(false);
        return rooms.stream()
                .map(RoomMapper::mapToRoomDAO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomDAO> getAvailableRoomsByType(String roomType) {
        List<Room> rooms = roomRepository.findAvailableRoomsByType(roomType);
        return rooms.stream()
                .map(RoomMapper::mapToRoomDAO)
                .collect(Collectors.toList());
    }

    @Override
    public RoomDAO updateRoom(Long roomId, RoomDAO updatedRoom) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomException.RoomNotFoundException("Room not found with id " + roomId));

        validateRoomData(updatedRoom);

        room.setRoomType(updatedRoom.getRoomType());
        room.setRoomPrice(updatedRoom.getRoomPrice());
        room.setRoomDescription(updatedRoom.getRoomDescription());
        room.setQualityLevel(updatedRoom.getQualityLevel());
        room.setBedType(updatedRoom.getBedType());
        room.setSmokingStatus(updatedRoom.getSmokingStatus());

        // Don't update booking status through general update
        Room updatedRoomObj = roomRepository.save(room);
        return RoomMapper.mapToRoomDAO(updatedRoomObj);
    }

    @Override
    public RoomDAO bookRoom(Long roomId, String userId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomException.RoomNotFoundException("Room not found with id " + roomId));

        if (room.getBooked()) {
            throw new RoomException.RoomAlreadyBookedException("Room is already booked");
        }

        if (!userRepository.existsById(Long.parseLong(userId))) {
            throw new RoomException.UserNotFoundException("User not found with id " + userId);
        }

        room.setBooked(true);
        room.setUserId(userId);
        room.setBookingDate(LocalDateTime.now());

        Room bookedRoom = roomRepository.save(room);
        return RoomMapper.mapToRoomDAO(bookedRoom);
    }

    @Override
    @Transactional
    public void deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomException.RoomNotFoundException("Room not found with id " + roomId));

        roomRepository.delete(room);
    }

    @Override
    public boolean isRoomAvailable(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomException.RoomNotFoundException("Room not found with id " + roomId));
        return !room.getBooked();
    }

    @Override
    public boolean validateRoomNumber(Integer roomNumber) {
        return !roomRepository.existsByRoomNumber(roomNumber);
    }

    private void validateRoomData(RoomDAO roomDAO) {
        // Validate room type
        try {
            RoomEnums.RoomType.valueOf(roomDAO.getRoomType().replace(" ", "_").toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RoomException.InvalidRoomDataException("Invalid room type");
        }

        // Validate quality level
        try {
            RoomEnums.QualityLevel.valueOf(roomDAO.getQualityLevel().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RoomException.InvalidRoomDataException("Invalid quality level");
        }

        // Validate bed type
        try {
            RoomEnums.BedType.valueOf(roomDAO.getBedType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RoomException.InvalidRoomDataException("Invalid bed type");
        }

        if (roomDAO.getRoomPrice() == null || roomDAO.getRoomPrice().signum() <= 0) {
            throw new RoomException.InvalidRoomDataException("Room price must be positive");
        }
    }
}