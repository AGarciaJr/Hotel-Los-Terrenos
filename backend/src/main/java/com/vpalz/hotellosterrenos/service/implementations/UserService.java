package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.dao.LoginRequest;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.entity.User;
import com.vpalz.hotellosterrenos.exception.MyException;
import com.vpalz.hotellosterrenos.repo.UserRepository;
import com.vpalz.hotellosterrenos.service.interfaces.IUserService;
import com.vpalz.hotellosterrenos.utils.JWTUtils;
import com.vpalz.hotellosterrenos.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        return null;
    }

    @Override
    public Response getAllUsers() {
        return null;
    }

    @Override
    public Response getUserReservationHistory(String userId) {
        return null;
    }

    @Override
    public Response deleteUser(String userId) {
        return null;
    }

    @Override
    public Response getUserById(String userId) {
        return null;
    }

    @Override
    public Response getUserInfo(String email) {
        return null;
    }
}
