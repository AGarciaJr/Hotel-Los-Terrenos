package com.localproj.backend.repository;

import com.localproj.backend.entity.Corporation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporationRepository extends JpaRepository<Corporation, String> {
    // The String type parameter matches our ID type
}