package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface reservationRepo extends JpaRepository<reservationSys, Integer> {
    List<reservationSys> findByUser(User user);

    // Custom query to find a specific reservation by user and vacation
    @Query("SELECT r FROM reservationSys r WHERE r.user = :user AND r.vacation = :vacation")
    reservationSys findByUserAndVacation(@Param("user") User user, @Param("vacation") Vacation vacation);
}
