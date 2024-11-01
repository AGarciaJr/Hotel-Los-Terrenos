package com.vpalz.hotellosterrenos.services;

import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.entity.RoomBooking;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.repo.RoomBookingRepository;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.exception.BookingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.UUID;
import java.util.List;

@Service
public class RoomBookingService {
    @Autowired
    private RoomBookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RoomBooking bookRoom(Long roomId, Long userId, LocalDate checkInDate, LocalDate checkOutDate) {
        // Validate dates
        if (checkInDate.isBefore(LocalDate.now())) {
            throw new BookingException("Check-in date cannot be in the past");
        }
        if (checkOutDate.isBefore(checkInDate)) {
            throw new BookingException("Check-out date must be after check-in date");
        }

        // Check if room exists
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BookingException("Room not found"));

        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BookingException("User not found"));

        // Check for overlapping bookings
        List<RoomBooking> overlappingBookings = bookingRepository.findOverlappingBookings(
                roomId, checkInDate, checkOutDate
        );

        if (!overlappingBookings.isEmpty()) {
            throw new BookingException("Room is not available for the selected dates");
        }

        // Create new booking
        RoomBooking booking = new RoomBooking();
        booking.setRoom(room);
        booking.setUser(user);
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setConfirmationCode(generateConfirmationCode());
        booking.setStatus("CONFIRMED");
        booking.setBookingDate(LocalDate.now());

        return bookingRepository.save(booking);
    }

    private String generateConfirmationCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public List<RoomBooking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<RoomBooking> getActiveBookingsByUser(Long userId) {
        return bookingRepository.findByUserIdAndStatus(userId, "CONFIRMED");
    }

    public RoomBooking getBookingByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByConfirmationCode(confirmationCode);
    }

    @Transactional
    public void cancelBooking(Long bookingId, Long userId) {
        RoomBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingException("Booking not found"));

        if (!booking.getUser().getId().equals(userId)) {
            throw new BookingException("Unauthorized to cancel this booking");
        }

        if (booking.getCheckInDate().isBefore(LocalDate.now())) {
            throw new BookingException("Cannot cancel past bookings");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}