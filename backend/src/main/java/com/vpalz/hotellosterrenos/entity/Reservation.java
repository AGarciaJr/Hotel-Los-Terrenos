package com.vpalz.hotellosterrenos.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

/**
 * Represents a reservation entity in the hotel reservation system.
 *
 * <p>This class captures the details of a room reservation, including check-in and check-out dates,
 * the number of guests, and references to the associated user and room.</p>
 *
 * <p><b>Author:</b> Alejandro Garcia Jr.</p>
 * <p><b>Date Created:</b> 10/23/2024</p>
 */
@Data
@Entity
@Table(name = "reservations")
public class Reservation {

    /**
     * The unique identifier for the reservation.
     * Generated automatically by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * The date when the reservation begins.
     *
     * <p>Must be provided by the user.</p>
     */
    @NotNull(message = "Check In Date is Required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")  // Changed to yyyy-MM-dd format
    private LocalDate checkInDate;

    /**
     * The date when the reservation ends.
     *
     * <p>Must be a future date and provided by the user.</p>
     */
    @NotNull(message = "Check Out Date is Required.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")  // Changed to yyyy-MM-dd format
    @Future(message = "Invalid Check Out Date.")
    private LocalDate checkOutDate;

    /**
     * The number of adults for the reservation.
     *
     * <p>Must be at least 1.</p>
     */
    @Min(value = 1, message = "Reservations require at least, 1 Adult.")
    private int numberOfAdults;

    /**
     * The number of children for the reservation.
     *
     * <p>Must be 0 or a positive number.</p>
     */
    @Min(value = 0, message = "Number of children must be valid.")
    private int numberOfChildren;

    /**
     * The total number of guests, calculated automatically based on adults and children.
     */
    private int totalNumberOfGuests;

    /**
     * A unique confirmation code for the reservation.
     */
    private String reservationConfirmationCode;

    /**
     * The user associated with the reservation.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * The room associated with the reservation.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    /**
     * Calculates and updates the total number of guests.
     */
    public void calculateTotalNumberOfGuests() {
        totalNumberOfGuests = numberOfAdults + numberOfChildren;
    }

    /**
     * Sets the number of adults and recalculates the total number of guests.
     *
     * @param numberOfAdults The number of adults.
     */
    public void setNumberOfAdults(int numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
        calculateTotalNumberOfGuests();
    }

    /**
     * Sets the number of children and recalculates the total number of guests.
     *
     * @param numberOfChildren The number of children.
     */
    public void setNumberOfChildren(int numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
        calculateTotalNumberOfGuests();
    }

    /**
     * Converts the reservation details into a string representation.
     *
     * @return A string containing the reservation's details.
     */
    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numberOfAdults=" + numberOfAdults +
                ", numberOfChildren=" + numberOfChildren +
                ", totalNumberOfGuests=" + totalNumberOfGuests +
                ", reservationConfirmationCode='" + reservationConfirmationCode + '\'' +
                '}';
    }
}