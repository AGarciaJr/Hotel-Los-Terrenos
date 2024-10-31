package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.entity.Floor;
import com.vpalz.hotellosterrenos.services.FloorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/floors")
@PreAuthorize("hasRole('ADMIN')")
public class FloorController {

    private final FloorService floorService;

    @Autowired
    public FloorController(FloorService floorService) {
        this.floorService = floorService;
    }

    @GetMapping("/{floorNumber}")
    public ResponseEntity<Floor> getFloorDetails(@PathVariable int floorNumber) {
        Floor floor = floorService.getFloorDetails(floorNumber);
        return ResponseEntity.ok(floor);
    }

    @PostMapping
    public ResponseEntity<String> addFloor(@RequestBody Floor floor) {
        floorService.addFloor(floor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Floor added successfully");
    }

    @DeleteMapping("/{floorNumber}")
    public ResponseEntity<String> removeFloor(@PathVariable int floorNumber) {
        floorService.removeFloor(floorNumber);
        return ResponseEntity.ok("Floor removed successfully");
    }
}