package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.ReservationDAO;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Reservation;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.enums.ReservationStatus;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.ReservationRepository;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IReservationService;
import com.vpalz.hotellosterrenos.service.interfaces.IRoomService;
import com.vpalz.hotellosterrenos.utils.Utils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private IRoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Response saveReservation(Long roomId, Long userId, Reservation reservationRequest) {
        Response response = new Response();

        try {
            if(!reservationRequest.getCheckOutDate().isAfter(reservationRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Invalid check in/out dates.");
            }

            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room Not Found."));
            User user = userRepository.findById(userId).orElseThrow(() -> new MyException("User Not Found."));

            List<Reservation> reservations = room.getReservations();

            if(!roomIsAvailable(reservationRequest, reservations)) {
                throw new MyException("Room not available for selected date range.");
            }

            reservationRequest.setRoom(room);
            reservationRequest.setUser(user);

            String reservationConfirmationCode = Utils.generateConfirmationCode(10);
            reservationRequest.setReservationConfirmationCode(reservationConfirmationCode);

            reservationRepository.save(reservationRequest);

            response.setStatusCode(200);
            response.setMessage("Successfully Saved Reservation");
            response.setReservationConfirmationCode(reservationConfirmationCode);

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a Reservation " + e.getMessage());
        }

        return response;
    }


    @Override
    public Response findReservationByConfirmationCode(String confirmationCode) {
        Response response = new Response();

        try {
            Reservation reservation = reservationRepository.findByReservationConfirmationCode(confirmationCode).orElseThrow(() -> new MyException("Reservation Not Found."));
            ReservationDAO reservationDAO = Utils.mapReservationEntityToReservationDAOPlusReservedRooms(reservation, true);

            response.setStatusCode(200);
            response.setMessage("Successfully Saved Reservation");
            response.setReservation(reservationDAO);

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Finding a Reservation " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllReservations() {
        Response response = new Response();

        try {
            List<Reservation> reservations = reservationRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<ReservationDAO> reservationDAOs = Utils.mapReservationListEntityToReservationDAOList(reservations);

            response.setStatusCode(200);
            response.setMessage("Successfully Saved Reservation");
            response.setReservationList(reservationDAOs);

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting All Reservations " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response cancelReservation(Long reservationId) {
        Response response = new Response();

        try{
            reservationRepository.findById(reservationId).orElseThrow(() -> new MyException("Reservation Not Found"));
            reservationRepository.deleteById(reservationId);

            response.setStatusCode(200);
            response.setMessage("Successfully Saved Reservation");
        }catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Canceling a Reservation " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response checkInReservation(Long reservationId) {
        Response response = new Response();

        try {
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new MyException("Reservation Not Found"));

            reservation.setStatus(ReservationStatus.CHECKED_IN);
            reservationRepository.save(reservation);

            response.setStatusCode(200);
            response.setMessage("Guest successfully checked in.");
        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error checking in guest: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response checkoutReservation(Long reservationId) {
        Response response = new Response();

        try {
            // Find the reservation
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new MyException("Reservation Not Found"));

            // Update the reservation status
            reservation.setStatus(ReservationStatus.CHECKED_OUT);
            reservationRepository.save(reservation);

            response.setStatusCode(200);
            response.setMessage("Guest successfully checked out.");
        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error checking out guest: " + e.getMessage());
        }

        return response;
    }


    private boolean roomIsAvailable(Reservation reservationRequest, List<Reservation> reservations) {
        return reservations.stream()
                .noneMatch(existingReservation ->
                        (existingReservation.getStatus().equals(ReservationStatus.BOOKED)) &&
                        (reservationRequest.getCheckInDate().equals(existingReservation.getCheckInDate())
                                || reservationRequest.getCheckOutDate().isBefore(existingReservation.getCheckOutDate())
                                || (reservationRequest.getCheckInDate().isAfter(existingReservation.getCheckInDate())
                                && reservationRequest.getCheckInDate().isBefore(existingReservation.getCheckOutDate()))
                                || (reservationRequest.getCheckInDate().isBefore(existingReservation.getCheckInDate())

                                && reservationRequest.getCheckOutDate().equals(existingReservation.getCheckOutDate()))
                                || (reservationRequest.getCheckInDate().isBefore(existingReservation.getCheckInDate())

                                && reservationRequest.getCheckOutDate().isAfter(existingReservation.getCheckOutDate()))

                                || (reservationRequest.getCheckInDate().equals(existingReservation.getCheckOutDate())
                                && reservationRequest.getCheckOutDate().equals(existingReservation.getCheckInDate()))

                                || (reservationRequest.getCheckInDate().equals(existingReservation.getCheckOutDate())
                                && reservationRequest.getCheckOutDate().equals(reservationRequest.getCheckInDate()))

                                || (reservationRequest.getStatus().equals(existingReservation.getStatus()))
                        )
                );
    }
    @Override
    public Response updateReservationByConfirmationCode(String confirmationCode, Reservation updatedReservation) {
        Response response = new Response();
        try {
            Reservation reservation = reservationRepository.findByReservationConfirmationCode(confirmationCode)
                    .orElseThrow(() -> new MyException("Reservation Not Found."));

            if (updatedReservation.getCheckInDate() != null) {
                reservation.setCheckInDate(updatedReservation.getCheckInDate());
            }
            if (updatedReservation.getCheckOutDate() != null) {
                reservation.setCheckOutDate(updatedReservation.getCheckOutDate());
            }
            reservation.setNumberOfAdults(updatedReservation.getNumberOfAdults());
            reservation.setNumberOfChildren(updatedReservation.getNumberOfChildren());

            reservationRepository.save(reservation);

            var reservationDAO = Utils.mapReservationEntityToReservationDAOPlusReservedRooms(reservation, true);

            response.setStatusCode(200);
            response.setMessage("Reservation updated successfully.");
            response.setReservation(reservationDAO);
        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating reservation: " + e.getMessage());
        }

        return response;
    }

}
