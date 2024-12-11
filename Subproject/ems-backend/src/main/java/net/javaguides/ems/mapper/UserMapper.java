package net.javaguides.ems.mapper;

import net.javaguides.ems.dao.UserDto;
import net.javaguides.ems.entity.User;


public class UserMapper {

    public static UserDto maptoUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getRole(),
                user.getCompany()
        );
    }

    public static User maptoUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getPhone(),
                userDto.getRole(),
                userDto.getCompany()
        );
    }
}
