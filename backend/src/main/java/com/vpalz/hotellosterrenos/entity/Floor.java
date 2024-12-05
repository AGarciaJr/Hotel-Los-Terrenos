package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "floors")
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String theme;
    private int number;

    @OneToMany(mappedBy = "floor")
    private List<Room> rooms;

    @Override
    public String toString() {
        return "Floor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", theme='" + theme + '\'' +
                ", rooms=" + rooms +
                '}';
    }
}
