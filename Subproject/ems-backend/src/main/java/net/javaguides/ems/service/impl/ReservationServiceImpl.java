package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dao.ReservationDTO;
import net.javaguides.ems.dao.Response;
import net.javaguides.ems.entity.Reservation;
import net.javaguides.ems.entity.Room;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.repository.ReservationRepository;
import net.javaguides.ems.repository.RoomRepository;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.ReservationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Response createReservation(ReservationDTO reservationDTO) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(reservationDTO.getRoomId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

            User user = userRepository.findById(reservationDTO.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            // Check if room is available
            List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                    reservationDTO.getRoomId(),
                    reservationDTO.getCheckInDate(),
                    reservationDTO.getCheckOutDate()
            );

            if (!overlapping.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Room is not available for these dates");
                return response;
            }

            Reservation reservation = new Reservation();
            reservation.setRoom(room);
            reservation.setUser(user);
            reservation.setCheckInDate(reservationDTO.getCheckInDate());
            reservation.setCheckOutDate(reservationDTO.getCheckOutDate());
            reservation.setNumberOfGuests(reservationDTO.getNumberOfGuests());
            reservation.setReservationDate(LocalDateTime.now());
            reservation.setCanceled(false);

            reservationRepository.save(reservation);

            response.setStatusCode(200);
            response.setMessage("Reservation created successfully");
        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error creating reservation");
        }
        return response;
    }

    @Override
    public Response getUserReservations(Long userId) {
        Response response = new Response();
        try {
            List<Reservation> reservations = reservationRepository.findByUserId(userId);
            response.setStatusCode(200);
            response.setMessage("Reservations retrieved successfully");
            // You'll need to map reservations to DTOs here
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving reservations");
        }
        return response;
    }

    @Override
    @Transactional
    public Response cancelReservation(Long reservationId) {
        Response response = new Response();
        try {
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

            // Check cancellation window
            long daysSinceReservation = ChronoUnit.DAYS.between(
                    reservation.getReservationDate().toLocalDate(),
                    LocalDateTime.now().toLocalDate()
            );

            reservation.setCanceled(true);
            reservation.setCancellationDate(LocalDateTime.now());
            reservationRepository.save(reservation);

            String message = daysSinceReservation <= 2
                    ? "Reservation cancelled successfully with no fee"
                    : "Reservation cancelled with 80% of one night's stay fee";

            response.setStatusCode(200);
            response.setMessage(message);
        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error cancelling reservation");
        }
        return response;
    }

    @Override
    public Response checkRoomAvailability(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Response response = new Response();
        try {
            List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                    roomId, checkIn, checkOut
            );
            response.setStatusCode(200);
            response.setMessage(overlapping.isEmpty() ? "Room is available" : "Room is not available");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error checking availability");
        }
        return response;
    }
}