package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Corporation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporationRepository extends JpaRepository<Corporation, String> {
    // The String type parameter matches our ID type
}