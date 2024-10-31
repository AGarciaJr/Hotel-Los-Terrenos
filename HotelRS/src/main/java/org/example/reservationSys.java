package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.time.LocalDate;

public class reservationSys {
    public static boolean makeReservation(User user, int vacationId, String paymentStatus) {
        try (Connection conn = dbConnection.connect()) {
            String query = "INSERT INTO Reservations (user_id, vacation_id, reservation_date, payment_status) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, user.getUserId());
            stmt.setInt(2, vacationId);
            stmt.setDate(3, java.sql.Date.valueOf(LocalDate.now()));
            stmt.setString(4, paymentStatus);

            stmt.executeUpdate();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
