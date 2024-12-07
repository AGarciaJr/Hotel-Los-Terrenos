package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.enums.BedType;
import com.vpalz.hotellosterrenos.enums.QualityLevel;
import com.vpalz.hotellosterrenos.service.implementations.UserService;
import com.vpalz.hotellosterrenos.service.interfaces.IReservationService;
import com.vpalz.hotellosterrenos.service.interfaces.IRoomService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;

    @Autowired
    private IReservationService reservationService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> addNewRoom(
            @RequestParam("roomNumber") int roomNumber,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("qualityLevel") QualityLevel qualityLevel,
            @RequestParam("bedType") BedType bedType,
            @RequestParam("smokingStatus") boolean smokingStatus,
            @RequestParam("roomDescription") String roomDescription
    ) {
        if (roomPrice == null || qualityLevel == null || bedType == null || roomNumber <= 0) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Invalid data. Required fields: Room Number, Room Price, Quality Level, Bed Type, Smoking Status.");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = roomService.addNewRoom(roomNumber, roomType, roomPrice, qualityLevel, bedType, smokingStatus, roomDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @GetMapping("/all")
    public ResponseEntity<Response> getAllRooms() {
        Response response = roomService.getAllRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{roomId}")
    public ResponseEntity<Response> getRoomById(@PathVariable Long roomId) {
        Response response = roomService.getRoomById(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<Response> getAvailableRooms() {
        Response response = roomService.getAllAvailableRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<Response> getAvailableRoomsByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String roomType
    ) {
        if (checkInDate == null || checkOutDate == null || roomType == null || roomType.isBlank()) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Invalid data. Required fields: Check In Date, Check Out Date, Room Type.");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = roomService.getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> updateRoom(
            @PathVariable Long roomId,
            @RequestParam int roomNumber,
            @RequestParam String roomType,
            @RequestParam BigDecimal roomPrice,
            @RequestParam QualityLevel qualityLevel,
            @RequestParam BedType bedType,
            @RequestParam boolean smokingStatus,
            @RequestParam String roomDescription
    ) {
        Response response = roomService.updateRoom(roomId, roomNumber, roomType, roomPrice, qualityLevel, bedType, smokingStatus, roomDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{roomId}")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> deleteRoom(@PathVariable Long roomId) {
        Response response = roomService.deleteRoom(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
