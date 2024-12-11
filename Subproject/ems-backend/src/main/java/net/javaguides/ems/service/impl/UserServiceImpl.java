package net.javaguides.ems.service.impl;

import net.javaguides.ems.dao.UserDto;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.UserMapper;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    @Override
    public boolean existsById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent();
    }
}
