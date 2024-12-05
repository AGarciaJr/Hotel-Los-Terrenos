package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.FloorDAO;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Floor;
import com.vpalz.hotellosterrenos.entity.Room;
import com.vpalz.hotellosterrenos.repo.FloorRepository;
import com.vpalz.hotellosterrenos.repo.RoomRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IFloorService;
import com.vpalz.hotellosterrenos.utils.Utils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
