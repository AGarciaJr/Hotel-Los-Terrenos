package com.vpalz.hotellosterrenos.services;

import com.vpalz.hotellosterrenos.DAO.FloorDAO;
import com.vpalz.hotellosterrenos.entity.Floor;

public class FloorService {

    private FloorDAO floorDAO;

    public Floor getFloorDetails(int floorNumber) {
        return floorDAO.getFloorByNumber(floorNumber);
    }

    public void addFloor(Floor floor) {
        // Business logic, e.g., validation
        floorDAO.saveFloor(floor);
    }

    public void removeFloor(int floorNumber) {
        floorDAO.deleteFloor(floorNumber);
    }
}
