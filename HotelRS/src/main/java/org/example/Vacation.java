package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class Vacation {
    private int vacationId;
    private String location;
    private String description;
    private double price;

    public Vacation(int vacationId, String location, String description, double price) {
        this.vacationId = vacationId;
        this.location = location;
        this.description = description;
        this.price = price;
    }

    public static List<Vacation> getAvailableVacations() {
        List<Vacation> vacations = new ArrayList<>();
        try (Connection conn = dbConnection.connect()) {
            String query = "SELECT * FROM Vacations";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                vacations.add(new Vacation(rs.getInt("vacation_id"), rs.getString("location"),
                        rs.getString("description"), rs.getDouble("price")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return vacations;
    }

    public int getVacationId() {
        return vacationId;
    }

    public String getLocation() {
        return location;
    }
}
