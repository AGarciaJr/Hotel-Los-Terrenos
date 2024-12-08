package com.localproj.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "corporations")
public class Corporation {
    @Id
    @Column(name = "id")
    private String id;  // This will store CORP001, etc.

    @NotBlank(message = "Corporation name is required")
    @Column(name = "corporation_name", nullable = false)
    private String corporationName;
}