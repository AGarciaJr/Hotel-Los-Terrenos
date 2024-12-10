package com.vpalz.hotellosterrenos.adding;

import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.enums.BedType;
import com.vpalz.hotellosterrenos.enums.QualityLevel;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.service.implementations.FloorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class RoomServiceTest {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FloorService floorService;

    @BeforeEach
    public void setup() {

        List<String> natureRetreatRoomTypes = Arrays.asList("Single", "Double", "Family");
        List<String> urbanEleganceRoomTypes = Arrays.asList("Suite", "Deluxe");
        List<String> vintageCharmRoomTypes = Arrays.asList("Standard", "Deluxe");

        createRooms("Single", BedType.KING, BedType.QUEEN);
        createRooms("Double", BedType.TWIN, BedType.FULL);
        createRooms("Family", BedType.TWIN, BedType.FULL);
        createRooms("Suite", BedType.KING, BedType.QUEEN);
        createRooms("Deluxe", BedType.KING, BedType.QUEEN);
        createRooms("Standard", BedType.FULL, BedType.FULL);

        createFloor("First Floor","Nature Retreat", 1, natureRetreatRoomTypes);
        createFloor("Second Floor", "Urban Elegance", 2, urbanEleganceRoomTypes);
        createFloor("Third Floor Floor","Vintage Charm", 3,  vintageCharmRoomTypes);
    }

    private void createFloor(String name, String theme, Integer floorNum, List<String> roomTypes) {
        floorService.addNewFloor(name, theme, floorNum, roomTypes);
    }

    private void createRooms(String roomType, BedType bedType1, BedType bedType2) {
        for (QualityLevel qualityLevel : QualityLevel.values()) {
            createRoom(roomType, qualityLevel, bedType1);
            createRoom(roomType, qualityLevel, bedType2);
        }
    }

    private void createRoom(String roomType, QualityLevel qualityLevel, BedType bedType) {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(calculatePrice(qualityLevel));
        room.setQualityLevel(qualityLevel);
        room.setBedType(bedType);

        room.setSmokingStatus(Math.random() > 0.5);
        room.setRoomNumber(generateUniqueRoomNumber());
        room.setRoomDescription("This is a " + roomType + " Room" + " with " + bedType + " bed and quality level " + qualityLevel);

        roomRepository.save(room);
    }

    private BigDecimal calculatePrice(QualityLevel qualityLevel) {
        BigDecimal basePrice = new BigDecimal("100.00");

        switch (qualityLevel) {
            case EXECUTIVE:
                return basePrice.add(new BigDecimal("50.00"));
            case BUSINESS:
                return basePrice.add(new BigDecimal("30.00"));
            case COMFORT:
                return basePrice.add(new BigDecimal("20.00"));
            case ECONOMY:
                return basePrice.add(new BigDecimal("10.00"));
            default:
                return basePrice;
        }
    }

    private int generateUniqueRoomNumber() {
        return (int) (Math.random() * 100);
    }

    @Test
    public void testRoomsAdded() {
        assertNotNull(roomRepository.findAll());
    }
}
