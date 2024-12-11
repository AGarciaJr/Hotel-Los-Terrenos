package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Corporation;
import com.vpalz.hotellosterrenos.service.interfaces.ICorporationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/corporations")
public class CorporationController {

    @Autowired
    private ICorporationService corporationService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createCorporation(@RequestBody Corporation corporation) {
        Response response = corporationService.createCorporation(corporation);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'CLERK')")
    public ResponseEntity<Response> getAllCorporations() {
        Response response = corporationService.getAllCorporations();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'CLERK')")
    public ResponseEntity<Response> getCorporationById(@PathVariable String id) {
        Response response = corporationService.getCorporationById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}