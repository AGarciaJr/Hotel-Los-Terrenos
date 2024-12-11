package net.javaguides.ems.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDAO {
    private Long id;
    private Integer roomNumber; // unique room number
    private String roomType;    // Nature Retreat, Urban Elegance, or Vintage Charm
    private String qualityLevel; // executive, business, comfort, or economy
    private String bedType;     // twin, full, queen, or king
    private Boolean smokingStatus;
    private BigDecimal roomPrice;
    private String roomDescription;
    private Boolean booked;
    private String userId;
    private LocalDateTime bookingDate; // To track when the room was booked (for cancellation policy)
}