package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="rooms")

public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(name = "type")
    private String roomType;

    @Column(name = "price")
    private BigDecimal roomPrice;

    @Column(name = "description")
    private String roomDescription;

    @Column(name = "status")
    private Boolean booked;

    @Column(name = "user", unique = true)
    private String userId;

}

