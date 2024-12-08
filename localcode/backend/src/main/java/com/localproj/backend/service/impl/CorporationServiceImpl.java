package com.localproj.backend.service.impl;

import com.localproj.backend.dto.CorporationDto;
import com.localproj.backend.entity.Corporation;
import com.localproj.backend.exception.ResourceNotFoundException;
import com.localproj.backend.mapper.CorporationMapper;
import com.localproj.backend.repository.CorporationRepository;
import com.localproj.backend.service.CorporationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CorporationServiceImpl implements CorporationService {

    private CorporationRepository corporationRepository;

    @Override
    public CorporationDto createCorporation(CorporationDto corporationDto) {
        Corporation corporation = CorporationMapper.mapToCorporation(corporationDto);
        Corporation savedCorporation = corporationRepository.save(corporation);
        return CorporationMapper.mapToCorporationDto(savedCorporation);
    }

    @Override
    public CorporationDto getCorporationById(String corporationId) {
        Corporation corporation = corporationRepository.findById(corporationId)
                .orElseThrow(() -> new ResourceNotFoundException("Corporation does not exist with given id: " + corporationId));
        return CorporationMapper.mapToCorporationDto(corporation);
    }

    @Override
    public List<CorporationDto> getAllCorporations() {
        List<Corporation> corporations = corporationRepository.findAll();
        return corporations.stream()
                .map(CorporationMapper::mapToCorporationDto)
                .collect(Collectors.toList());
    }

    @Override
    public CorporationDto updateCorporation(String corporationId, CorporationDto updatedCorporation) {
        Corporation corporation = corporationRepository.findById(corporationId)
                .orElseThrow(() -> new ResourceNotFoundException("Corporation does not exist with given id: " + corporationId));

        corporation.setCorporationName(updatedCorporation.getCorporationName());

        Corporation updatedCorporationObj = corporationRepository.save(corporation);
        return CorporationMapper.mapToCorporationDto(updatedCorporationObj);
    }

    @Override
    public void deleteCorporation(String corporationId) {
        Corporation corporation = corporationRepository.findById(corporationId)
                .orElseThrow(() -> new ResourceNotFoundException("Corporation does not exist with given id: " + corporationId));
        corporationRepository.delete(corporation);
    }
}