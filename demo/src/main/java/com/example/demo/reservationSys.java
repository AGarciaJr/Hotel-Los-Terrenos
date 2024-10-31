package com.example.demo;

import jakarta.persistence.*;

@Entity
public class reservationSys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vacation_id", nullable = false)
    private Vacation vacation;

    public reservationSys() {}

    public reservationSys(User user, Vacation vacation) {
        this.user = user;
        this.vacation = vacation;
    }

    public int getReservationId() {
        return reservationId;
    }

    public User getUser() {
        return user;
    }

    public Vacation getVacation() {
        return vacation;
    }
}
