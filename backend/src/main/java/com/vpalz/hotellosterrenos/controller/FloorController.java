package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.service.interfaces.IFloorService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("/floors")
public class FloorController {

    @Autowired
    private IFloorService floorService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> addNewFloor(
            @RequestParam(value = "floorName") String floorName,
            @RequestParam(value = "floorTheme") String floorTheme,
            @RequestParam(value = "floorNumber") Integer floorNumber,
            @RequestParam(value = "roomTypes") List<String> roomTypes
            ) {
        if (floorName == null || floorName.isBlank() || floorTheme == null || floorTheme.isBlank()) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Invalid data. Required fields: Floor Name, Floor Theme");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = floorService.addNewFloor(floorName, floorTheme, floorNumber, roomTypes);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllFloors() {
        Response response = floorService.getAllFloors();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{floorId}")
    public ResponseEntity<Response> getFloorById(@PathVariable Long floorId) {
        Response response = floorService.getFloorById(floorId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{floorId}")
    @PreAuthorize("hasAuthority('CLERK')")
    public ResponseEntity<Response> updateFloor(
            @PathVariable Long floorId,
            @RequestParam(value = "floorName", required = false) String floorName,
            @RequestParam(value = "theme", required = false) String theme
    ) {
        Response response = floorService.updateFloor(floorId, floorName, theme);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
