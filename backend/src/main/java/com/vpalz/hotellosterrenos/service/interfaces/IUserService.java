package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.LoginRequest;
import com.vpalz.hotellosterrenos.dao.PasswordChangeRequest;
import com.vpalz.hotellosterrenos.dao.PasswordChangeRequest;
import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserReservationHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getUserInfo(String email);

    /**
     *
     * @param email
     * @param userUpdate
     * @return
     */
    Response updateProfile(String email, User userUpdate);

    /**
     *
     * @param email
     * @param request
     * @return
     */
    Response changePassword(String email, PasswordChangeRequest request);


    Response updatePassword(String userId, String newPassword);
}
