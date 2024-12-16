package com.anhminh.minhminh.service;

import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.exception.ResourceNotFoundException;
import com.anhminh.minhminh.mapper.UserMap;
import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMap userMap;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserMap userMap, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMap = userMap;
        this.passwordEncoder = passwordEncoder;
    }




    public void registerUser(UserDto userDto) {
        Users users = userMap.toEntity(userDto);
        String encodedPassword = passwordEncoder.encode(users.getPassword());
        users.setPassword(encodedPassword);
        userRepository.save(users);
    }
    public UserDto findByIdUser(Long id) {
        Optional<Users> user = userRepository.findById(id);
        return user.map(userMap::toDto).orElseThrow(() -> new ResourceNotFoundException("id này ko tồn tại!"));
    }

    public UserDto findByUserName(String userName) {
        Optional<Users> user = userRepository.findByUserName(userName);
        return user.map(userMap::toDto).orElseThrow(() -> new ResourceNotFoundException("ten này ko tồn tại!"));
    }

    public List<UserDto> allUser() {
        List<UserDto> userDtoList = new ArrayList<>();
        for (Users user : userRepository.findAll()) {
            UserDto userDto = userMap.toDto(user);
            userDtoList.add(userDto);
        }
        return userDtoList;
    }
    public void deleteUser(Long id) {
        Optional<Users> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.deleteById(id);
        }
        else throw new ResourceNotFoundException("id không tồn tại!");
    }
    public void updateUser(UserDto userDto, Long id) {
        Optional<Users> user = userRepository.findById(id);
        if(user.isPresent()) {
            userDto.setId(id);
            userDto.setGmail(user.get().getGmail());
            userDto.setPassword(user.get().getPassword());
            Users users = userMap.toEntity(userDto);
            userRepository.save(users);
        }
        else throw new ResourceNotFoundException("id không tồn tại!");
    }


}
