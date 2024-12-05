package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.entity.RoomBooking;
import com.vpalz.hotellosterrenos.services.RoomBookingService;
import com.vpalz.hotellosterrenos.DTO.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class RoomBookingController {
    @Autowired
    private RoomBookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<RoomBooking> bookRoom(@RequestBody BookingRequest request) {
        RoomBooking booking = bookingService.bookRoom(
                request.getRoomId(),
                request.getUserId(),
                request.getCheckInDate(),
                request.getCheckOutDate()
        );
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RoomBooking>> getUserBookings(@PathVariable Long userId) {
        List<RoomBooking> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(
            @PathVariable Long bookingId,
            @RequestParam Long userId
    ) {
        bookingService.cancelBooking(bookingId, userId);
        return ResponseEntity.ok().build();
    }
}