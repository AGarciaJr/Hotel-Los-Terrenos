package net.javaguides.ems.controller;

import net.javaguides.ems.dao.CorporationDto;
import net.javaguides.ems.service.CorporationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/corporations")
public class CorporationController {

    private CorporationService corporationService;

    @PostMapping
    public ResponseEntity<CorporationDto> createCorporation(@RequestBody CorporationDto corporationDto) {
        CorporationDto savedCorporation = corporationService.createCorporation(corporationDto);
        return new ResponseEntity<>(savedCorporation, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CorporationDto> getCorporationById(@PathVariable("id") String corporationId) {
        CorporationDto corporationDto = corporationService.getCorporationById(corporationId);
        return ResponseEntity.ok(corporationDto);
    }

    @GetMapping
    public ResponseEntity<List<CorporationDto>> getAllCorporations() {
        List<CorporationDto> corporations = corporationService.getAllCorporations();
        return ResponseEntity.ok(corporations);
    }

    @PutMapping("{id}")
    public ResponseEntity<CorporationDto> updateCorporation(@PathVariable("id") String corporationId,
                                                            @RequestBody CorporationDto updatedCorporation) {
        CorporationDto corporationDto = corporationService.updateCorporation(corporationId, updatedCorporation);
        return ResponseEntity.ok(corporationDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCorporation(@PathVariable("id") String corporationId) {
        corporationService.deleteCorporation(corporationId);
        return ResponseEntity.ok("Corporation deleted Successfully!");
    }
}
