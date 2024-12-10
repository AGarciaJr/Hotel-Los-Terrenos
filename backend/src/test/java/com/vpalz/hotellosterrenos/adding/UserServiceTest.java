package com.vpalz.hotellosterrenos.adding;

import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.implementations.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private User guest;
    private User clerk;
    private User admin;

    @BeforeEach
    public void setUp() {
        // Create a new set of users for each test
        guest = new User();
        guest.setName("John Doe");
        guest.setEmail("john_doe@example.com");
        guest.setPhoneNumber("1234567890");
        guest.setPassword("user");
        guest.setRole("GUEST");

        clerk = new User();
        clerk.setName("Jane Smith");
        clerk.setEmail("jane_smith_clerk@example.com");
        clerk.setPhoneNumber("1234567891");
        clerk.setPassword("clerk");
        clerk.setRole("CLERK");

        admin = new User();
        admin.setName("Mike John");
        admin.setEmail("mike_john_admin@example.com");
        admin.setPhoneNumber("1234567893");
        admin.setPassword("admin");
        admin.setRole("ADMIN");
    }

    @Test
    public void testAddUsers() {
        // Save the users to the database
        UserDAO savedGuest = userService.register(guest).getUser();
        UserDAO savedClerk = userService.register(clerk).getUser();
        UserDAO savedAdmin = userService.register(admin).getUser();

        // Assert that they are saved correctly
        assertNotNull(savedGuest);
        assertNotNull(savedClerk);
        assertNotNull(savedAdmin);

        // Check that the users are in the database
        assertTrue(userRepository.existsById(savedGuest.getId()));
        assertTrue(userRepository.existsById(savedClerk.getId()));
        assertTrue(userRepository.existsById(savedAdmin.getId()));
    }
}
