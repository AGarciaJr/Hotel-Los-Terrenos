package com.vpalz.hotellosterrenos.services;

import com.vpalz.hotellosterrenos.dao.FloorDAO;
import com.vpalz.hotellosterrenos.entity.Floor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FloorService {

    private final FloorDAO floorDAO;

    @Autowired
    public FloorService(FloorDAO floorDAO) {
        this.floorDAO = floorDAO;
    }

    public Floor getFloorDetails(int floorNumber) {
        return floorDAO.getFloorByNumber(floorNumber);
    }

    public void addFloor(Floor floor) {
        floorDAO.saveFloor(floor);
    }

    public void removeFloor(int floorNumber) {
        floorDAO.deleteFloor(floorNumber);
    }
}