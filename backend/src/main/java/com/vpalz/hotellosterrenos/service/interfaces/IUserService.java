package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.LoginRequest;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.dao.UserDAO;
import com.vpalz.hotellosterrenos.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserReservationHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getUserInfo(String email);

    Response updatePassword(String userId, String newPassword);

    Response updateUserInfo(String userId, UserDAO userDao);

    Response getUserByPhone(String phoneNumber);

    Response updateUserById(String userId, UserDAO updatedUser);
}
