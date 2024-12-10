package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "corporations")
public class Corporation {
    @Id
    @Column(length = 7)  // "corp" + 3 digits
    private String id;    // Will store values like "corp001"

    @NotBlank(message = "Corporation name is required")
    @Column(unique = true)
    private String name;
}