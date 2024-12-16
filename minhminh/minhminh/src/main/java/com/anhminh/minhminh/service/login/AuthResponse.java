package com.anhminh.minhminh.service.login;

import com.anhminh.minhminh.dto.UserDto;

public class AuthResponse {
    private String token;
    private String email;
    private UserDto userDto;

    public AuthResponse() {
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    public AuthResponse(String token, String email) {
        this.token = token;
        this.email = email;
    }

    public AuthResponse(String token, UserDto userDto) {
        this.token = token;
        this.userDto = userDto;
    }

    public String getEmail() {
        return email;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public String getToken() {
        return token;
    }
}
