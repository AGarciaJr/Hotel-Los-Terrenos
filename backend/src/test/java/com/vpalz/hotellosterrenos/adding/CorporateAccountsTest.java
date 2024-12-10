package com.vpalz.hotellosterrenos.adding;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Corporation;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.repo.CorporationRepository;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.implementations.CorporationService;
import com.vpalz.hotellosterrenos.service.implementations.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CorporateAccountsTest {

    @Autowired
    private CorporationService corporationService;

    @Autowired
    private UserService userService;

    @Autowired
    private CorporationRepository corporationRepository;

    @Autowired
    private UserRepository userRepository;

    private Corporation apple;
    private Corporation google;
    private Corporation meta;

    @BeforeEach
    public void setUp() {
        // Create corporations
        apple = new Corporation();
        apple.setId("corp001");
        apple.setName("Apple Inc.");

        google = new Corporation();
        google.setId("corp002");
        google.setName("Google LLC");

        meta = new Corporation();
        meta.setId("corp003");
        meta.setName("Meta Platforms");
    }

    @Test
    public void testAddCorporationsAndUsers() {
        // this save corporations
        Response appleResponse = corporationService.createCorporation(apple);
        Response googleResponse = corporationService.createCorporation(google);
        Response metaResponse = corporationService.createCorporation(meta);

        // this assert corporations were saved
        assertEquals(200, appleResponse.getStatusCode());
        assertEquals(200, googleResponse.getStatusCode());
        assertEquals(200, metaResponse.getStatusCode());

        // this be creating corporate users *magical*
        createCorporateUser("Tim Cook", "tim.cook@apple.com", "123-456-7890", apple);
        createCorporateUser("Craig Federighi", "craig.fed@apple.com", "123-456-7891", apple);

        createCorporateUser("Sundar Pichai", "sundar.pichai@google.com", "123-456-7892", google);
        createCorporateUser("Susan Wojcicki", "susan.w@google.com", "123-456-7893", google);

        createCorporateUser("Mark Zuckerberg", "mark.zuck@meta.com", "123-456-7894", meta);
        createCorporateUser("Sheryl Sandberg", "sheryl.s@meta.com", "123-456-7895", meta);

        // it verifies corporations exist in database like a hawk scouts their prey
        assertTrue(corporationRepository.existsById("corp001"));
        assertTrue(corporationRepository.existsById("corp002"));
        assertTrue(corporationRepository.existsById("corp003"));

        // verify users were created with correct corporate associations like a boss
        assertEquals(2, userRepository.findByCorporation(apple).size());
        assertEquals(2, userRepository.findByCorporation(google).size());
        assertEquals(2, userRepository.findByCorporation(meta).size());
    }

    private void createCorporateUser(String name, String email, String phone, Corporation corporation) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setPassword("password123");
        user.setRole("USER");
        user.setCorporation(corporation);

        Response response = userService.register(user);
        assertEquals(200, response.getStatusCode());
        assertNotNull(response.getUser());
        assertEquals(corporation.getId(), response.getUser().getCorporation().getId());
    }
}