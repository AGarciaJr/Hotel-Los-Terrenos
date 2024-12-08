package com.localproj.backend.service;

import com.localproj.backend.dto.CorporationDto;
import java.util.List;

public interface CorporationService {
    CorporationDto createCorporation(CorporationDto corporationDto);

    CorporationDto getCorporationById(String corporationId);

    List<CorporationDto> getAllCorporations();

    CorporationDto updateCorporation(String corporationId, CorporationDto updatedCorporation);

    void deleteCorporation(String corporationId);
}