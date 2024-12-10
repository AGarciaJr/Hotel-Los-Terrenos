package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.CorporationDAO;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Corporation;
import com.vpalz.hotellosterrenos.entity.CorporationSequence;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.CorporationRepository;
import com.vpalz.hotellosterrenos.repo.CorporationSequenceRepository;
import com.vpalz.hotellosterrenos.service.interfaces.ICorporationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CorporationService implements ICorporationService {

    @Autowired
    private CorporationRepository corporationRepository;

    @Autowired
    private CorporationSequenceRepository sequenceRepository;

    @Override
    public Response createCorporation(Corporation corporation) {
        Response response = new Response();
        try {
            if (corporationRepository.existsByName(corporation.getName())) {
                throw new MyException("Corporation with this name already exists");
            }

            // Generate the next corporation ID
            String corporationId = generateNextCorporationId();
            corporation.setId(corporationId);

            Corporation savedCorporation = corporationRepository.save(corporation);
            CorporationDAO corporationDAO = mapCorporationToDAO(savedCorporation);

            response.setStatusCode(200);
            response.setMessage("Corporation created successfully");
            response.setCorporation(corporationDAO);
        } catch (MyException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error creating corporation: " + e.getMessage());
        }
        return response;
    }

    @Transactional
    public String generateNextCorporationId() {
        Long nextSeq = sequenceRepository.getMaxSequence() + 1;

        // Create new sequence record
        CorporationSequence sequence = new CorporationSequence();
        sequence.setSeq(nextSeq);
        sequenceRepository.save(sequence);

        // Format: "corp" + 3 digits with leading zeros
        return String.format("corp%03d", nextSeq);
    }

    @Override
    public Response getAllCorporations() {
        Response response = new Response();
        try {
            List<Corporation> corporations = corporationRepository.findAll();
            List<CorporationDAO> corporationDAOs = corporations.stream()
                    .map(this::mapCorporationToDAO)
                    .collect(Collectors.toList());

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved all corporations");
            response.setCorporations(corporationDAOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving corporations: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getCorporationById(String id) {
        Response response = new Response();
        try {
            Corporation corporation = corporationRepository.findById(id)
                    .orElseThrow(() -> new MyException("Corporation not found"));

            response.setStatusCode(200);
            response.setMessage("Successfully retrieved corporation");
            response.setCorporation(mapCorporationToDAO(corporation));
        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving corporation: " + e.getMessage());
        }
        return response;
    }

    private CorporationDAO mapCorporationToDAO(Corporation corporation) {
        CorporationDAO dao = new CorporationDAO();
        dao.setId(corporation.getId());
        dao.setName(corporation.getName());
        return dao;
    }
}