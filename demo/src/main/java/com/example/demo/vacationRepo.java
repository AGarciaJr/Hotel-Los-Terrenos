package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface vacationRepo extends JpaRepository<Vacation, Integer> {
    // JpaRepository provides methods like findAll(), findById(), save(), delete(), etc.
}
