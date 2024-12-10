package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vacation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vacationId;
    private String location;
    private String description;
    private double price;

    // Default constructor required by JPA
    public Vacation() {}

    public Vacation(String location, String description, double price) {
        this.location = location;
        this.description = description;
        this.price = price;
    }

    // Getters and Setters
    public int getVacationId() {
        return vacationId;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }
}
