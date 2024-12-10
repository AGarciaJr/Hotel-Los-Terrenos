package com.vpalz.hotellosterrenos.entity;

import com.vpalz.hotellosterrenos.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPhoneNumber("123-456-7890");
        user.setPassword("securePassword");
        user.setRole("USER");
    }

    @Test
    void testGettersAndSetters() {
        assertEquals(1L, user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("Test User", user.getName());
        assertEquals("123-456-7890", user.getPhoneNumber());
        assertEquals("securePassword", user.getPassword());
        assertEquals("USER", user.getRole());
    }


    @Test
    void testGetAuthorities() {
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        assertNotNull(authorities);
        assertEquals(1, authorities.size());
        assertTrue(authorities.stream()
                .anyMatch(auth -> auth.getAuthority().equals("USER")));
    }

    @Test
    void testReservations() {
        assertNotNull(user.getReservations());
        assertTrue(user.getReservations().isEmpty());

        Reservation reservation = new Reservation();
        reservation.setId(1L);
        user.getReservations().add(reservation);

        assertEquals(1, user.getReservations().size());
        assertEquals(1L, user.getReservations().get(0).getId());
    }
}