package net.javaguides.ems.dao;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservationDTO {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfGuests;
    private Long roomId;
    private Long userId;
    private boolean isCanceled;
}