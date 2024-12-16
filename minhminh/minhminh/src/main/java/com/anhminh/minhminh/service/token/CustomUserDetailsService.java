package com.anhminh.minhminh.service.token;

import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tải thông tin người dùng từ cơ sở dữ liệu (ví dụ)
        // Ở đây, bạn có thể viết logic để lấy User từ database
        Optional<Users> existingUser = Optional.ofNullable(userRepository.findByGmail(username));

        if (existingUser.isPresent()) {
            return org.springframework.security.core.userdetails.User.withUsername(username)
                    .password(passwordEncoder.encode(existingUser.get().getPassword()))// {noop} dùng để mã hóa password đơn giản trong ví dụ này
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}

