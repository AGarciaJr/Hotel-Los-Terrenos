package com.vpalz.hotellosterrenos.controller;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('CLERK') or hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update-password/{userId}")
    @PreAuthorize("hasAnyAuthority()")
    public ResponseEntity<Response> updatePassword(@PathVariable("userId") String userId, @RequestParam("password") String newPassword) {
        Response response = userService.updatePassword(userId, newPassword);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<Response> getById(@PathVariable("userId") String userId) {
        Response response = userService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Response> deleteUser(@PathVariable("userId") String userId) {
        Response response = userService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<Response> getLoggedInProfileInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Response response = userService.getUserInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("get-user-reservations/{userId}")
    public ResponseEntity<Response> getUserReservations(@PathVariable("userId") String userId) {
        Response response = userService.getUserReservationHistory(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    /**
     *
     * @param userId
     * @param updatedUser
     * @return
     */
    @PutMapping("/update-user-info/{userId}")
    public ResponseEntity<Response> updateUserInfo(@PathVariable("userId") String userId, @RequestBody UserDAO updatedUser) {
        Response response = userService.updateUserInfo(userId, updatedUser);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-phone/{phoneNumber}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getUserByPhone(@PathVariable("phoneNumber") String phoneNumber) {
        Response response = userService.getUserByPhone(phoneNumber);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateUserById(@PathVariable("userId") String userId, @RequestBody UserDAO updatedUserDetails) {
        Response response = userService.updateUserById(userId, updatedUserDetails);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/set-corporate-id/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> setCorporateId(@PathVariable("userId") String userId,
                                                   @RequestParam("corporateId") String corporateId) { // Changed to String
        Response response = userService.setCorporateId(userId, corporateId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/corporate/{corporateId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'CLERK')")
    public ResponseEntity<Response> getUsersByCorporateId(@PathVariable("corporateId") String corporateId) { // Changed to String
        Response response = userService.getUsersByCorporateId(corporateId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
