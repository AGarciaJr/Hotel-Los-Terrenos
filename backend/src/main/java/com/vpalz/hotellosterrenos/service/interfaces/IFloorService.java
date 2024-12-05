package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Floor;

import java.util.List;

public interface IFloorService {

    /**
     * Retrieves all floors.
     *
     * @return Response containing the list of all floors
     */
    Response getAllFloors();

    /**
     * Retrieves a floor by its ID.
     *
     * @param id the ID of the floor
     * @return Response containing the floor details
     */
    Response getFloorById(Long id);

    /**
     * Creates a new floor.
     *
     * @param floor the floor to create
     * @return Response with the created floor
     */
    Response createFloor(Floor floor);

    /**
     * Updates an existing floor by its ID.
     *
     * @param id the ID of the floor
     * @return Response containing the updated floor
     */
    Response updateFloor(Long id, String floorName, String floorTheme);

    Response addNewFloor(String floorName, String theme, Integer floorNumber, List<String> roomTypes);

    Response getAllRoomsForFloor(Long floorId);
}
