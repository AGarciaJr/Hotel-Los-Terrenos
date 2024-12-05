package com.vpalz.hotellosterrenos.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FloorDAO {
    private Long id;
    private String name;
    private String theme;
    private List<RoomDAO> rooms;
}
