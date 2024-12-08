package com.localproj.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Password is required")
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank(message = "Email is required")
    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Phone Number is required")
    @Column(name = "phone_number", nullable = false, unique = true)
    private String phone;

    @Column(name = "role")
    private String role;

    @Column(name = "company")
    private String company;

}
