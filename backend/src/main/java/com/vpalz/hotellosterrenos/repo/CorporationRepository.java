package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.Corporation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CorporationRepository extends JpaRepository<Corporation, String> {
    boolean existsByName(String name);
    Optional<Corporation> findByName(String name);
}