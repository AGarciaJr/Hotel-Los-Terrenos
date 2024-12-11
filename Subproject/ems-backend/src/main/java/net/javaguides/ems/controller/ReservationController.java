package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dao.ReservationDTO;
import net.javaguides.ems.dao.Response;
import net.javaguides.ems.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{roomId}/reserve/{userId}")
    public ResponseEntity<Response> reserveRoom(
            @PathVariable Long roomId,
            @PathVariable Long userId,
            @RequestBody ReservationDTO reservationDTO) {
        // Set the roomId and userId in the ReservationDTO
        reservationDTO.setRoomId(roomId);
        reservationDTO.setUserId(userId);

        Response response = reservationService.createReservation(reservationDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{roomId}/availability")
    public ResponseEntity<Response> checkRoomAvailability(
            @PathVariable Long roomId,
            @RequestParam LocalDate checkIn,
            @RequestParam LocalDate checkOut) {
        Response response = reservationService.checkRoomAvailability(roomId, checkIn, checkOut);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{roomId}/cancel/{reservationId}")
    public ResponseEntity<Response> cancelReservation(
            @PathVariable Long roomId,
            @PathVariable Long reservationId) {
        Response response = reservationService.cancelReservation(reservationId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
