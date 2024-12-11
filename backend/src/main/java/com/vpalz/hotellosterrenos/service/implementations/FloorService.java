package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.FloorDAO;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.RoomDAO;
import com.vpalz.hotellosterrenos.entity.Floor;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.enums.ReservationStatus;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.FloorRepository;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IFloorService;
import com.vpalz.hotellosterrenos.utils.Utils;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class FloorService implements IFloorService {

    @Autowired
    private FloorRepository floorRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Response getAllFloors() {
        Response response = new Response();

        try {
            List<Floor> floors = floorRepository.findAll();
            List<FloorDAO> floorDAOs = Utils.mapFloorListEntityToFloorDAOList(floors);

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved all floors.");
            response.setFloorList(floorDAOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving floors: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getFloorById(Long id) {
        Response response = new Response();

        try {
            Floor floor = floorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Floor not found."));
            FloorDAO floorDAO = Utils.mapFloorEntityToFloorDAO(floor);

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved floor.");
            response.setFloor(floorDAO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving floor: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response createFloor(Floor floor) {
        Response response = new Response();

        try {
            Floor savedFloor = floorRepository.save(floor);
            FloorDAO floorDAO = Utils.mapFloorEntityToFloorDAO(savedFloor);

            response.setStatusCode(201);
            response.setMessage("Successfully created floor.");
            response.setFloor(floorDAO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error creating floor: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response updateFloor(Long id, String floorName, String floorTheme) {
        Response response = new Response();

        try {
            Floor floor = floorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Floor not found."));
            floor.setName(floorName);
            floor.setTheme(floorTheme);
            Floor updatedFloor = floorRepository.save(floor);

            FloorDAO floorDAO = Utils.mapFloorEntityToFloorDAO(updatedFloor);
            response.setStatusCode(200);
            response.setMessage("Successfully updated floor.");
            response.setFloor(floorDAO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating floor: " + e.getMessage());
        }

        return response;
    }

    @Transactional
    @Override
    public Response addNewFloor(String floorName, String floorTheme, Integer floorNumber, List<String> roomTypes) {
        Response response = new Response();

        try {
            Floor floor = new Floor();

            floor.setName(floorName);
            floor.setTheme(floorTheme);
            floor.setNumber(floorNumber);

            List<Room> roomsForFloor = roomRepository.findRoomsByType(roomTypes);

            floor.setRooms(roomsForFloor);

            Floor savedFloor = floorRepository.save(floor);

            for(String roomType : roomTypes){
                List<Room> roomsToUpdate = roomRepository.findRoomByType(roomType);

                for(Room room : roomsToUpdate){
                    room.setFloor(savedFloor);
                    roomRepository.save(room);
                }
            }

            FloorDAO floorDAO = Utils.mapFloorEntityToFloorDAO(savedFloor);

            response.setStatusCode(200);
            response.setMessage("Successfully added new floor.");
            response.setFloor(floorDAO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error adding new floor: " + e.getMessage());
        }

        return response;
    }

    public Response getAllRoomsForFloor(Long id) {
        Response response = new Response();

        try {
            Floor floor = floorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Floor not found."));
            List<Room> allRooms = floor.getRooms().stream().collect(Collectors.toList());

            List<Room> availableRooms = allRooms.stream()
                    .filter(room -> room.getReservations().stream()
                            .noneMatch(reservation ->
                                    reservation.getStatus() == ReservationStatus.BOOKED ||
                                            reservation.getStatus() == ReservationStatus.CHECKED_IN))
                    .collect(Collectors.toList());

            List<RoomDAO> roomDAOs = Utils.mapRoomListEntityToRoomDAOList(availableRooms);

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved available rooms for floor.");
            response.setRoomList(roomDAOs);
        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving available rooms for floor: " + e.getMessage());
        }

        return response;
    }
}
