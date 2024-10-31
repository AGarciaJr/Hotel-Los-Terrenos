package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class vacationService {

    private final vacationRepo vacationRepository;

    @Autowired  // Autowires the repository into this constructor
    public vacationService(vacationRepo vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    public List<Vacation> getAvailableVacations() {
        return vacationRepository.findAll(); // Uses the autowired repository
    }
}
