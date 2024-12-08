package com.vpalz.hotellosterrenos.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vpalz.hotellosterrenos.enums.ReservationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Check In Date is Required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;

    @NotNull(message = "Check Out Date is Required.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Future(message = "Invalid Check Out Date.")
    private LocalDate checkOutDate;

    @Min(value = 1, message = "Reservations require at least, 1 Adult.")
    private int numberOfAdults;

    @Min(value = 0, message = "Number of children must be valid.")
    private int numberOfChildren;

    private int totalNumberOfGuests;

    private String reservationConfirmationCode;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate reservationCreationDate = LocalDate.now();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate cancellationDate;

    private BigDecimal cancellationFee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.BOOKED;

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
                ", reservationCreationDate=" + reservationCreationDate +
                ", cancellationDate=" + cancellationDate +
                ", cancellationFee=" + cancellationFee +
                ", status=" + status +
                '}';
    }
}