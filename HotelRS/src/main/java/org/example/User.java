package org.example;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class User {
    private int userId;
    private String email;

    public User(int userId, String email) {
        this.userId = userId;
        this.email = email;
    }

    public static boolean createAccount(String email, String password) {
        String passwordHash = hashPassword(password); // Hash the password

        if (passwordHash == null) {
            System.out.println("Failed to hash password.");
            return false;
        }

        try (Connection conn = dbConnection.connect()) {
            String query = "INSERT INTO Users (email, password_hash) VALUES (?, ?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, email);
            stmt.setString(2, passwordHash);

            stmt.executeUpdate();
            System.out.println("Account created successfully for email: " + email);
            return true;

        } catch (SQLException e) {
            if (e.getSQLState().startsWith("23")) { // SQLState "23" for unique constraint violation
                System.out.println("Account creation failed: Email already exists.");
            } else {
                e.printStackTrace(); // Print stack trace for other SQL exceptions
            }
            return false;
        }
    }

    private static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256"); // Use SHA-256 for hashing
            byte[] hashedBytes = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static User login(String email, String password) {
        String passwordHash = hashPassword(password); // Hash the input password to compare

        if (passwordHash == null) {
            System.out.println("Failed to hash password for login.");
            return null;
        }

        try (Connection conn = dbConnection.connect()) {
            String query = "SELECT user_id FROM Users WHERE email = ? AND password_hash = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, email);
            stmt.setString(2, passwordHash);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new User(rs.getInt("user_id"), email);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getEmail() {
        return email;
    }

    public int getUserId() {
        return userId;
    }
}
