package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

/*
 * Reservation
 *
 * Author: Alejandro Garcia Jr.
 * Date Created: 10/23/2024
 *
 * Description:
 */

@Data
@Entity
@Table(name = "reservations")
public class Reservation {
    /*
     * Because we are using a database and jakarta
     * we need to use @Id and @GeneratedValue
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /*
     * We can have these functions send messages
     * to the frontend on certain things:
     * The Check In Date was not selected.
     * The Check Out Date selected is before
     * the Check In date.
     */

    @NotNull(message = "Check In Date is Required")
    private LocalDate checkInDate;

    @NotNull(message = "Check Out Date is Required.")
    @Future(message = "Invalid Check Out Date.")
    private LocalDate checkOutDate;

    @Min(value = 1, message = "Reservations require at least, 1 Adult.")
    private int numberOfAdults;

    @Min(value = 0, message = "Number of children must be valid.")
    private int numberOfChildren;

    private int totalNumberOfGuests;

    private String reservationConfirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public void calculateTotalNumberOfGuests() {
        totalNumberOfGuests = numberOfAdults + numberOfChildren;
    }

    public void setNumberOfAdults(int numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
        calculateTotalNumberOfGuests();
    }

    public void setNumberOfChildren(int numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
        calculateTotalNumberOfGuests();
    }

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
