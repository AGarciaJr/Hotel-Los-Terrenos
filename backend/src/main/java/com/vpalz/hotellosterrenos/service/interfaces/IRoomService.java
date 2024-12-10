package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.enums.BedType;
import com.vpalz.hotellosterrenos.enums.QualityLevel;
/*
 * import org.springframework.web.multipart.MultipartFile;
 * We will only use this if I end up deciding to use the AWS
 * to store the images, but I have not figured that out yet...
 */
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {
    Response addNewRoom(
            int roomNumber,
            String roomType,
            BigDecimal roomPrice,
            QualityLevel qualityLevel,
            BedType bedType,
            boolean smokingStatus,
            String roomDescription
    );

    List<String> getAllRoomTypes();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(
                        Long roomId,
                        String roomType,
                        BigDecimal roomPrice,
                        QualityLevel qualityLevel,
                        BedType bedType,
                        boolean smokingStatus,
                        String roomDescription
    );

    Response getRoomById(Long roomId);

    Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAllAvailableRooms();
}
