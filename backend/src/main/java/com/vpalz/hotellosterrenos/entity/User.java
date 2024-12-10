package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Represents a User entity in the Hotel Los Terrenos system.
 *
 * <p>This class implements the {@link UserDetails} interface to provide
 * security and authentication details for users in the system.</p>
 *
 * <p>A user has an email, name, phone number, password, role, and a list of
 * reservations. It is stored in the database under the "users" table.</p>
 *
 * <p>Author: Alejandro Garcia Jr.<br>
 * Date Created: 10/23/2024</p>
 */
@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user's email address. This field is required and must be unique.
     */
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String email;

    /**
     * The user's full name. This field is required.
     */
    @NotBlank(message = "Name is required")
    private String name;

    /**
     * The user's phone number. This field is required.
     */
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;

    /**
     * The user's password. This field is required.
     */
    @NotBlank(message = "Password is required")
    private String password;

    /**
     * The user's role, e.g., "USER", "ADMIN", or "CLERK".
     */
    private String role;

    /**
     * A list of reservations associated with this user.
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    /**
     * Returns the authorities granted to the user based on their role.
     *
     * @return a collection of granted authorities for the user.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    /**
     * Returns the username used to authenticate the user, which is the email address.
     *
     * @return the user's email.
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Indicates whether the user's account has expired. Always returns {@code true}.
     *
     * @return {@code true} if the user's account is not expired.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is locked. Always returns {@code true}.
     *
     * @return {@code true} if the user's account is not locked.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials have expired. Always returns {@code true}.
     *
     * @return {@code true} if the user's credentials are not expired.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is enabled. Always returns {@code true}.
     *
     * @return {@code true} if the user's account is enabled.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
