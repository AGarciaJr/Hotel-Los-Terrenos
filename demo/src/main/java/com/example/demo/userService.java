package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class userService {

    private final userRepo userRepository;
    private final vacationRepo vacationRepository;
    private final reservationRepo reservationRepository;

    @Autowired
    public userService(userRepo userRepository, vacationRepo vacationRepository, reservationRepo reservationRepository) {
        this.userRepository = userRepository;
        this.vacationRepository = vacationRepository;
        this.reservationRepository = reservationRepository;
    }

    public User login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Directly compare stored password with user input
            if (user.getPassword().equals(password)) {
                return user;  // Successful login
            }
        }

        return null;  // Login failed
    }

    public void addToCart(User user, Vacation vacation) {
        // Check if vacation exists in the database
        if (vacation.getVacationId() == 0 || !vacationRepository.existsById(vacation.getVacationId())) {
            vacation = vacationRepository.save(vacation);  // Save vacation if it’s new
        }

        // Now create and save the reservation
        reservationSys reservation = new reservationSys(user, vacation);
        reservationRepository.save(reservation);
    }

    public List<reservationSys> getUserCart(User user) {
        return reservationRepository.findByUser(user);
    }

    public boolean createAccount(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("Account creation failed: Email already exists.");
            return false;
        }

        User newUser = new User(email, password);
        userRepository.save(newUser);
        System.out.println("Account created successfully for email: " + email);
        return true;
    }

    public void removeFromCart(User user, Vacation vacation) {
        reservationSys reservation = reservationRepository.findByUserAndVacation(user, vacation);
        if (reservation != null) {
            reservationRepository.delete(reservation);
        }
    }

    public void checkout(User user) {
        List<reservationSys> cartItems = reservationRepository.findByUser(user);
        reservationRepository.deleteAll(cartItems);
    }
}
