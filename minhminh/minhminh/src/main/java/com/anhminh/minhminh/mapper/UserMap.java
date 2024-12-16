package com.anhminh.minhminh.mapper;

import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.module.Users;
import org.springframework.stereotype.Component;

@Component
public class UserMap {
    public Users toEntity(UserDto userDto) {
        Users users = new Users();
        users.setAddress(userDto.getAddress());
        users.setAvatar(userDto.getAvatar());
        users.setBio(userDto.getBio());
        users.setUserName(userDto.getUserName());
        users.setPassword(userDto.getPassword());
        users.setGmail(userDto.getGmail());
        users.setDate(userDto.getDate());
        users.setId(userDto.getId());
        users.setIsSingle(userDto.getIsSingle());

        return users;
    }

    public UserDto toDto(Users users) {
        UserDto userDto = new UserDto();
        userDto.setAddress(users.getAddress());
        userDto.setAvatar(users.getAvatar());
        userDto.setBio(users.getBio());
        userDto.setUserName(users.getUserName());
        userDto.setGmail(users.getGmail());
        userDto.setDate(users.getDate());
        userDto.setId(users.getId());
        userDto.setIsSingle(users.getIsSingle());

        return userDto;
    }
}
