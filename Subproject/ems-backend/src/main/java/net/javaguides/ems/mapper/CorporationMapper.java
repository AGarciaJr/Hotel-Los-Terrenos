package net.javaguides.ems.mapper;

import net.javaguides.ems.dao.CorporationDto;
import net.javaguides.ems.entity.Corporation;

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