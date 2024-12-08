package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.entity.Room;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.RoomMapper;
import net.javaguides.ems.repository.RoomRepository;
import net.javaguides.ems.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    private RoomRepository roomRepository;
    @Override
    public RoomDAO createRoom(RoomDAO RoomDAO) {

        Room room = RoomMapper.mapToRoom(RoomDAO);
        Room savedRoom = roomRepository.save(room);

        return RoomMapper.mapToRoomDAO(savedRoom);
    }

    @Override
    public RoomDAO getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id " + roomId));
        return RoomMapper.mapToRoomDAO(room);
    }

    @Override
    public List<RoomDAO> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();

        return rooms.stream().map((room) -> RoomMapper.mapToRoomDAO(room))
                .collect(Collectors.toList());
    }

    @Override
    public RoomDAO updateRoom(Long roomId, RoomDAO updatedRoom) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with id " + roomId));

        room.setRoomDescription(updatedRoom.getRoomDescription());
        room.setRoomPrice(updatedRoom.getRoomPrice());
        room.setRoomType(updatedRoom.getRoomType());
        room.setBooked(updatedRoom.getBooked());
        room.setUserId(updatedRoom.getUserId());

        Room updatedRoomObj  = roomRepository.save(room);

        return RoomMapper.mapToRoomDAO(updatedRoomObj);
    }

    @Override
    public void deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(
                () -> new ResourceNotFoundException("Room not found with id " + roomId));

        roomRepository.deleteById(roomId);
    }
}
