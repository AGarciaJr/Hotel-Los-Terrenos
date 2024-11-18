package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.LoginRequest;
import com.vpalz.hotellosterrenos.dao.PasswordChangeRequest;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IUserService;
import com.vpalz.hotellosterrenos.utils.JWTUtils;
import com.vpalz.hotellosterrenos.utils.Utils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MyException("User Not Found"));
            UserDAO userDAOs = Utils.mapUserEntityToUserDAOPlusUserReservationsAndRoom(user);
            response.setStatusCode(200);
            response.setMessage("Successfully got user reservation history.");
            response.setUser(userDAOs);

        } catch (MyException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());

        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred While Getting User Reservation History" + e.getMessage());
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


    @Override
    public Response updateProfile(String email, User userUpdate) {
        Response response = new Response();
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                response.setStatusCode(404);
                response.setMessage("User not found");
                return response;
            }

            User user = userOptional.get();
            if (userUpdate.getName() != null) user.setName(userUpdate.getName());
            if (userUpdate.getPhoneNumber() != null) user.setPhoneNumber(userUpdate.getPhoneNumber());

            user = userRepository.save(user);

            UserDAO userDAO = new UserDAO();
            userDAO.setId(user.getId());
            userDAO.setName(user.getName());
            userDAO.setEmail(user.getEmail());
            userDAO.setPhoneNumber(user.getPhoneNumber());
            userDAO.setRole(user.getRole());

            response.setStatusCode(200);
            response.setMessage("Profile updated successfully");
            response.setUser(userDAO);

            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating profile: " + e.getMessage());
            return response;
        }
    }

    @Override
    public Response changePassword(String email, PasswordChangeRequest request) {
        Response response = new Response();
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                response.setStatusCode(404);
                response.setMessage("User not found");
                return response;
            }

            User user = userOptional.get();

            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                response.setStatusCode(400);
                response.setMessage("Current password is incorrect");
                return response;
            }

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            response.setStatusCode(200);
            response.setMessage("Password updated successfully");

            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error changing password: " + e.getMessage());
            return response;
        }
    }

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

}
