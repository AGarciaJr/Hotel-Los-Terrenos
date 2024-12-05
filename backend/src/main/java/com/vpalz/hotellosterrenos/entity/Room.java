package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a room entity in the hotel reservation system.
 *
 * <p>This class includes details about a room such as its type, price,
 * description, and associated reservations.</p>
 *
 * <p>Each room is mapped to a table in the database and can have multiple
 * reservations associated with it.</p>
 *
 * <p><b>Author:</b> Alejandro Garcia Jr.</p>
 * <p><b>Date:</b> 10/24/2024</p>
 */
@Data
@Entity
@Table(name = "rooms")
public class Room {

    /**
     * The unique identifier for the room.
     * Generated automatically by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The type of the room (e.g., Single, Double, Suite).
     */
    private String roomType;

    /**
     * The price of the room per night.
     */
    private BigDecimal roomPrice;

    /**
     * A description of the room's features and amenities.
     */
    private String roomDescription;

    /**
     * The list of reservations associated with the room.
     * This field is lazily fetched and automatically managed.
     */
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "floor_id", referencedColumnName = "id")
    private Floor floor;

    /**
     * Converts the room details into a string representation.
     *
     * @return A string containing the room's details.
     */
    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", roomDescription='" + roomDescription + '\'' +
                ", reservations=" + reservations +
                '}';
    }
}
