package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import net.javaguides.ems.dao.RoomDAO;
import net.javaguides.ems.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private RoomService roomService;

    //Build Add Room REST API

    @PostMapping
    public ResponseEntity<RoomDAO> createRoom(@RequestBody RoomDAO roomDAO){
        RoomDAO savedRoom = roomService.createRoom(roomDAO);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }


    //Get Room REST API
    @GetMapping("{id}")
    public ResponseEntity<RoomDAO> getRoomById(@PathVariable("id") Long roomId){
        RoomDAO roomDAO = roomService.getRoomById(roomId);
        return ResponseEntity.ok(roomDAO);
    }

    //Get all Rooms REST API
    @GetMapping
    public ResponseEntity<List<RoomDAO>> getAllRooms() {
        List<RoomDAO> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    //Build update room Rest API
    @PutMapping("{id}")
    public ResponseEntity<RoomDAO> updateRoom(@PathVariable("id") Long roomId, @RequestBody RoomDAO updatedRoom) {
        RoomDAO roomDAO = roomService.updateRoom(roomId, updatedRoom);
        return ResponseEntity.ok(roomDAO);
    }

    //Build delete room Rest API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.ok("Room has been deleted successfully.");
    }
}
