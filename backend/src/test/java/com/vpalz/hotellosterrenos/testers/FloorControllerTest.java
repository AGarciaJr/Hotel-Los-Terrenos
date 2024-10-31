package com.vpalz.hotellosterrenos.testers;

import com.vpalz.hotellosterrenos.controller.FloorController;
import com.vpalz.hotellosterrenos.entity.Floor;
import com.vpalz.hotellosterrenos.services.FloorService;
import com.vpalz.hotellosterrenos.utils.JWTUtils;
import com.vpalz.hotellosterrenos.service.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FloorController.class)
class FloorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private FloorService floorService;

    @MockBean
    private JWTUtils jwtUtils;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void getFloorDetails_ExistingFloor_ReturnsFloor() throws Exception {
        Floor testFloor = new Floor(1, "Tropical", 10);
        when(floorService.getFloorDetails(1)).thenReturn(testFloor);

        mockMvc.perform(get("/api/floors/1")
                        .with(csrf()))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(testFloor)));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void getFloorDetails_NonExistingFloor_ReturnsNull() throws Exception {
        when(floorService.getFloorDetails(999)).thenReturn(null);

        mockMvc.perform(get("/api/floors/999")
                        .with(csrf()))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void addFloor_ValidFloor_ReturnsCreated() throws Exception {
        Floor testFloor = new Floor(1, "Tropical", 10);
        doNothing().when(floorService).addFloor(any(Floor.class));

        mockMvc.perform(post("/api/floors")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testFloor)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isCreated())
                .andExpect(content().string("Floor added successfully"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void removeFloor_ExistingFloor_ReturnsOk() throws Exception {
        doNothing().when(floorService).removeFloor(1);

        mockMvc.perform(delete("/api/floors/1")
                        .with(csrf()))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().string("Floor removed successfully"));
    }
}