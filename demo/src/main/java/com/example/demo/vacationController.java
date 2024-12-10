package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Component
public class vacationController {

    private final vacationService vacationService;

    @Autowired
    public vacationController(vacationService vacationService) {
        this.vacationService = vacationService;
    }

    public void displayAvailableVacations() {
        List<Vacation> vacations = vacationService.getAvailableVacations();
        vacations.forEach(vacation -> System.out.println("Vacation: " + vacation.getLocation() + " - Price: " + vacation.getPrice()));
    }
}
