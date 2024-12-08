package com.localproj.backend.service;

import com.localproj.backend.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(long userId);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUser);

    void deleteUser(long userId);

    boolean checkPhoneNumberExists(String phone);
}
