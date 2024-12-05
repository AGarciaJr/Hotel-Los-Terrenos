package com.vpalz.hotellosterrenos.service.implementations;


import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.RoomDAO;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.enums.ReservationStatus;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.ReservationRepository;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IRoomService;
import com.vpalz.hotellosterrenos.utils.Utils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;


    @Autowired
    private ReservationRepository reservationRepository;
    /*
    @Autowired
    private AwsS3Service awsS3Service;
     */

    @Override
    public Response addNewRoom(String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();

        try{
            //String imageUrl = awsS3Service.saveImageToS3(photo);

            Room room = new Room();
            //room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);

            Room savedRoom = roomRepository.save(room);

            RoomDAO roomDAO = Utils.mapRoomEntityToRoomDAO(savedRoom);

            response.setStatusCode(200);
            response.setMessage("Room added successfully");
            response.setRoom(roomDAO);

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Adding A New Room" + e.getMessage());
        }

        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();

        try{
            List<Room> rooms = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDAO> roomDAOs = Utils.mapRoomListEntityToRoomDAOList(rooms);

            response.setStatusCode(200);
            response.setMessage("Retrieved all rooms successfully.");
            response.setRoomList(roomDAOs);

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Getting All Rooms" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();

        try{
            roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room not found"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("Retrieved all rooms successfully.");

        } catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Getting All Rooms" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response updateRoom(Long roomId, BigDecimal roomPrice, String roomType, String description) {
        Response response = new Response();

        try{
            //String imageUrl = null;
            /*
            if(photo != null && !photo.isEmpty()){
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
             */

            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room not found"));
            if(roomType != null) room.setRoomType(roomType);
            if(roomPrice != null) room.setRoomPrice(roomPrice);
            if(description != null) room.setRoomDescription(description);
            //if(imageUrl != null) room.setRoomPhotoUrl(imageUrl);

            Room updatedRoom = roomRepository.save(room);
            RoomDAO roomDAO = Utils.mapRoomEntityToRoomDAO(updatedRoom);

            response.setStatusCode(200);
            response.setMessage("Updated Room successfully");
            response.setRoom(roomDAO);

        } catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Updating Room " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();

        try{
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room not found"));
            RoomDAO roomDAO = Utils.mapRoomEntityToRoomDAOPlusReservations(room);

            response.setStatusCode(200);
            response.setMessage("Room retrieved successfully.");
            response.setRoom(roomDAO);

        } catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Getting All Rooms" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();

        try{
            List<Room> availableRooms = roomRepository.findAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType,
                    List.of(ReservationStatus.BOOKED));
            List<RoomDAO> roomDAOs = Utils.mapRoomListEntityToRoomDAOList(availableRooms);

            response.setStatusCode(200);
            response.setMessage("Retrieved all rooms successfully.");
            response.setRoomList(roomDAOs);

        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Getting All Rooms" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();

        try{
            List<Room> availableRooms = roomRepository.getAllAvailableRooms(ReservationStatus.BOOKED);
            List<RoomDAO> roomDAOs = Utils.mapRoomListEntityToRoomDAOList(availableRooms);

            response.setStatusCode(200);
            response.setMessage("Retrieved all rooms successfully.");
            response.setRoomList(roomDAOs);

        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error While Getting All Rooms" + e.getMessage());
        }

        return response;
    }
}
