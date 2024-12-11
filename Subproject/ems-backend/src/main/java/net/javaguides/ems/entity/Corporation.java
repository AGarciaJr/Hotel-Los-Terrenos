package net.javaguides.ems.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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