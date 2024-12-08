package com.localproj.backend.mapper;

import com.localproj.backend.dto.CorporationDto;
import com.localproj.backend.entity.Corporation;

public class CorporationMapper {

    public static CorporationDto mapToCorporationDto(Corporation corporation) {
        return new CorporationDto(
                corporation.getId(),
                corporation.getCorporationName()
        );
    }

    public static Corporation mapToCorporation(CorporationDto corporationDto) {
        return new Corporation(
                corporationDto.getId(),
                corporationDto.getCorporationName()
        );
    }
}