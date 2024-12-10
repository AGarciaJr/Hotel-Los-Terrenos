package com.vpalz.hotellosterrenos.repo;

import com.vpalz.hotellosterrenos.entity.CorporationSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CorporationSequenceRepository extends JpaRepository<CorporationSequence, Long> {
    @Query(value = "SELECT COALESCE(MAX(seq), 0) FROM corp_sequence", nativeQuery = true)
    Long getMaxSequence();
}
