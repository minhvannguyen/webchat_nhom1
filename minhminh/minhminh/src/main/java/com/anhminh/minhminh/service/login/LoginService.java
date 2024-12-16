package com.anhminh.minhminh.service.login;

import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UserRepository userRepository,PasswordEncoder  passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean validateUser(String gmail, String password) {
        Users user = userRepository.findByGmail(gmail);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    public Users user(String gmail) {
        return userRepository.findByGmail(gmail);
    }
}
