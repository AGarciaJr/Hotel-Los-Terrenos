package net.javaguides.ems.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDAO {


    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String roomDescription;
    private Boolean booked;
    private String userId;
}
