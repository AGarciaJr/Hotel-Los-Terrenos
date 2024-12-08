package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Reservation;
import com.vpalz.hotellosterrenos.service.interfaces.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private IReservationService reservationService;

    @PostMapping("/reserve-room/{roomId}/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> saveReservations(@PathVariable Long roomId,
                                                     @PathVariable Long userId,
                                                     @RequestBody Reservation reservationRequest)
    {

        Response response = reservationService.saveReservation(roomId, userId, reservationRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> getReservations(){
        Response response = reservationService.getAllReservations();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<Response> getReservationByConfirmationCode(@PathVariable String confirmationCode){
        Response response = reservationService.findReservationByConfirmationCode(confirmationCode);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/cancel/{reservationId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> cancelReservation(@PathVariable Long reservationId){
        Response response = reservationService.cancelReservation(reservationId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/checkout/{reservationId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> checkoutReservation(@PathVariable Long reservationId) {
        Response response = reservationService.checkoutReservation(reservationId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update-by-confirmation-code/{confirmationCode}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> updateReservation(
            @PathVariable String confirmationCode,
            @RequestBody Reservation updatedReservation) {
        Response response = reservationService.updateReservationByConfirmationCode(confirmationCode, updatedReservation);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
