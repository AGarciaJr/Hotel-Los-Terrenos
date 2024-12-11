package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "room_number", unique = true, nullable = false)
    private Integer roomNumber;

    @Column(name = "type", nullable = false)
    private String roomType;  // Nature Retreat, Urban Elegance, Vintage Charm

    @Column(name = "quality_level", nullable = false)
    private String qualityLevel;  // executive, business, comfort, economy

    @Column(name = "bed_type", nullable = false)
    private String bedType;  // twin, full, queen, king

    @Column(name = "smoking_status", nullable = false)
    private Boolean smokingStatus;

    @Column(name = "price", nullable = false)
    private BigDecimal roomPrice;

    @Column(name = "description")
    private String roomDescription;

    @Column(name = "booked")
    private Boolean booked = false;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;
}