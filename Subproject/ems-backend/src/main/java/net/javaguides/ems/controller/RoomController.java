package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.service.RoomService;
import net.javaguides.ems.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.javaguides.ems.repository.ReservationRepository;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private RoomService roomService;
    private UserService userService;// Added to verify user existence
    private ReservationRepository reservationRepository;

    @PostMapping
    public ResponseEntity<RoomDAO> createRoom(@RequestBody RoomDAO roomDAO) {
        // Validate room type
        if (!isValidRoomType(roomDAO.getRoomType())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Validate quality level
        if (!isValidQualityLevel(roomDAO.getQualityLevel())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Validate bed type
        if (!isValidBedType(roomDAO.getBedType())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        RoomDAO savedRoom = roomService.createRoom(roomDAO);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<RoomDAO> getRoomById(@PathVariable("id") Long roomId) {
        RoomDAO roomDAO = roomService.getRoomById(roomId);
        return ResponseEntity.ok(roomDAO);
    }

    @GetMapping
    public ResponseEntity<List<RoomDAO>> getAllRooms() {
        List<RoomDAO> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @PutMapping("{id}")
    public ResponseEntity<RoomDAO> updateRoom(@PathVariable("id") Long roomId, @RequestBody RoomDAO updatedRoom) {
        RoomDAO roomDAO = roomService.updateRoom(roomId, updatedRoom);
        return ResponseEntity.ok(roomDAO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.ok("Room has been deleted successfully.");
    }

    // New endpoint for booking a room
    @PutMapping("/book/{id}/{userId}")
    public ResponseEntity<?> bookRoom(@PathVariable("id") Long roomId, @PathVariable("userId") String userId) {
        // First verify if user exists
        if (!userService.existsById(Long.valueOf(userId))) {
            return ResponseEntity
                    .badRequest()
                    .body("User ID " + userId + " not found in the database.");
        }

        RoomDAO room = roomService.getRoomById(roomId);

        if (room.getBooked()) {
            return ResponseEntity
                    .badRequest()
                    .body("Room is already booked.");
        }

        room.setBooked(true);
        room.setUserId(userId);
        room.setBookingDate(LocalDateTime.now());

        RoomDAO updatedRoom = roomService.updateRoom(roomId, room);
        return ResponseEntity.ok(updatedRoom);
    }

    private boolean isValidRoomType(String roomType) {
        if (roomType == null) return false;
        return roomType.equals("Nature Retreat") ||
                roomType.equals("Urban Elegance") ||
                roomType.equals("Vintage Charm");
    }

    private boolean isValidQualityLevel(String qualityLevel) {
        if (qualityLevel == null) return false;
        return qualityLevel.equals("executive") ||
                qualityLevel.equals("business") ||
                qualityLevel.equals("comfort") ||
                qualityLevel.equals("economy");
    }

    private boolean isValidBedType(String bedType) {
        if (bedType == null) return false;
        return bedType.equals("twin") ||
                bedType.equals("full") ||
                bedType.equals("queen") ||
                bedType.equals("king");
    }

    @GetMapping("/{roomId}/check-reservations")
    public ResponseEntity<Map<String, Boolean>> checkRoomReservations(@PathVariable Long roomId) {
        boolean hasReservations = reservationRepository.existsByRoomId(roomId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("hasReservations", hasReservations);
        return ResponseEntity.ok(response);
    }
}