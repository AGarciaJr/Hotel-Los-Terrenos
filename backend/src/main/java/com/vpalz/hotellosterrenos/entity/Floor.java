package com.vpalz.hotellosterrenos.entity;

public class Floor {
    private int floorNumber;
    private String theme;
    private int numberOfRooms;

    public Floor(int floorNumber, String theme, int numberOfRooms) {
        this.floorNumber = floorNumber;
        this.theme = theme;
        this.numberOfRooms = numberOfRooms;
    }

    public Integer getFloorNumber() {
        return floorNumber;
    }
}
