package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.LoginRequest;
import com.vpalz.hotellosterrenos.dao.ReservationDAO;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.entity.Reservation;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.ReservationRepository;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IUserService;
import com.vpalz.hotellosterrenos.utils.JWTUtils;
import com.vpalz.hotellosterrenos.utils.Utils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Response register(User user) {
        Response response = new Response();
        try{
            if(user.getRole() == null || user.getRole().isEmpty()){
                user.setRole("USER");
            }
            if(userRepository.existsByEmail(user.getEmail())){
                throw new MyException("This email has been registered previously.");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDAO userDAO = Utils.mapUserEntityToUserDAO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDAO);
            response.setMessage("User registered successfully.");
        }catch (MyException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Registration" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new MyException("User Not Found"));
        
            var token = jwtUtils.generateToken(user);
            
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days"); //Might change.
            response.setMessage("User logged in successfully.");
        }catch (MyException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Login" + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllUsers() {
        Response response = new Response();
        
        try{
            List<User> users = userRepository.findAll();
            List<UserDAO> userDAOS = Utils.mapUserListEntityToUserDAOList(users);
            response.setStatusCode(200);
            response.setMessage("Successfully Retrieved All Users");
            response.setUserList(userDAOS);
        }catch (MyException e){
            response.setStatusCode(500);
            response.setMessage("Error: Could Not Retrieve All Users" + e.getMessage());
        }
        
        return response;
    }

    @Override
    public Response getUserReservationHistory(String userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new MyException("User Not Found"));

            List<Reservation> reservations = reservationRepository.findActiveReservationsByUserId(user.getId());

            List<ReservationDAO> activeReservations = reservations.stream()
                    .map(Utils::mapReservationEntityToReservationDAO)
                    .collect(Collectors.toList());

            UserDAO userDAO = Utils.mapUserEntityToUserDAOPlusUserReservations(user, activeReservations);

            response.setStatusCode(200);
            response.setMessage("Successfully got user reservation history.");
            response.setUser(userDAO);

        } catch (MyException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while getting user reservation history: " + e.getMessage());
        }

        return response;
    }



    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();

        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MyException("User Not Found"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("Successfully deleted user.");

        } catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred While Deleting User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MyException("User Not Found"));
            UserDAO userDAO = Utils.mapUserEntityToUserDAO(user);
            response.setStatusCode(200);
            response.setMessage("Successfully got user.");
            response.setUser(userDAO);
        }catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred Getting Deleting User" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserInfo(String email) {
        Response response = new Response();

        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new MyException("User Not Found"));
            UserDAO userDAO = Utils.mapUserEntityToUserDAO(user);
            response.setStatusCode(200);
            response.setMessage("Successfully got user.");
            response.setUser(userDAO);
        }catch (MyException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred Getting Deleting User" + e.getMessage());
        }
        return response;
    }

    /**
     *
     * @param userId
     * @param newPassword
     * @return
     */
    public Response updatePassword(String userId, String newPassword) {
        Response response = new Response();
        try {
            // Retrieve the user by userId
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MyException("User Not Found"));

            // Encrypt the new password
            String encodedPassword = passwordEncoder.encode(newPassword);

            // Update the user's password
            user.setPassword(encodedPassword);

            // Save the updated user
            userRepository.save(user);

            // Set success message
            response.setStatusCode(200);
            response.setMessage("Password updated successfully.");

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating password: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateUserInfo(String userId, UserDAO updatedUser) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new MyException("User Not Found"));

            String currentEmail = user.getEmail();
            String newEmail = updatedUser.getEmail();

            if (currentEmail.contains("_admin@") && !newEmail.contains("_admin@")) {
                response.setStatusCode(400);
                response.setMessage("Cannot remove _admin@ from email to maintain admin role");
                return response;
            }

            if (currentEmail.contains("_clerk@") && !newEmail.contains("_clerk@")) {
                response.setStatusCode(400);
                response.setMessage("Cannot remove _clerk@ from email to maintain clerk role");
                return response;
            }

            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPhoneNumber(updatedUser.getPhoneNumber());

            User updatedUserObj = userRepository.save(user);
            UserDAO userDAO = Utils.mapUserEntityToUserDAO(updatedUserObj);

            response.setStatusCode(200);
            response.setMessage("User information updated successfully.");
            response.setUser(userDAO);

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating user information: " + e.getMessage());
        }

        return response;
    }


}
