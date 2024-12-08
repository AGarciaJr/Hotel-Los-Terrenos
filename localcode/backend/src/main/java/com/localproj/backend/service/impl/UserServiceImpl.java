package com.localproj.backend.service.impl;

import com.localproj.backend.dto.UserDto;
import com.localproj.backend.entity.User;
import com.localproj.backend.exception.ResourceNotFoundException;
import com.localproj.backend.mapper.UserMapper;
import com.localproj.backend.repository.UserRepository;
import com.localproj.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = UserMapper.maptoUser(userDto);
        User savedUser = userRepository.save(user);

        return UserMapper.maptoUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id" + userId));
        return UserMapper.maptoUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::maptoUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given id" + userId)
        );

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setPhone(updatedUser.getPhone());
        user.setRole(updatedUser.getRole());
        user.setCompany(updatedUser.getCompany());

        User updatedUserObj = userRepository.save(user);

        return UserMapper.maptoUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(long userId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given id" + userId)
        );
        userRepository.delete(user);
    }

    @Override
    public boolean checkPhoneNumberExists(String phone) {
        return userRepository.existsByPhone(phone);
    }
}
