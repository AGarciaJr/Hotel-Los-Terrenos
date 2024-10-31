package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/ReservationSystemDB";
    private static final String USER = "root";
    private static final String PASSWORD = "TXsyhg8681!";

    public static Connection connect() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}