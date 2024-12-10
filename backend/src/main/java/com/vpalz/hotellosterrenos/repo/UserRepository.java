package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.Corporation;
import com.vpalz.hotellosterrenos.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    List<User> findByCorporation(Corporation corporation);
}
