package net.javaguides.ems.service;

import net.javaguides.ems.dao.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(long userId);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUser);

    void deleteUser(long userId);

    boolean checkPhoneNumberExists(String phone);

    boolean existsById(Long userId);
}
