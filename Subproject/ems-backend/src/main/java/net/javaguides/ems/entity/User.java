package net.javaguides.ems.entity;

import jakarta.persistence.*;
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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(name = "name", nullable = false)
    private String name = "";

    @NotBlank(message = "Password is required")
    @Column(name = "password", nullable = false)
    private String password = "";

    @NotBlank(message = "Email is required")
    @Column(name = "email_id", nullable = false, unique = true)
    private String email = "";

    @NotBlank(message = "Phone Number is required")
    @Column(name = "phone_number", nullable = false, unique = true)
    private String phone = "";

    @Column(name = "role")
    private String role = "USER";

    @Column(name = "company")
    private String company = "Not Applicable";
}