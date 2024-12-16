package com.anhminh.minhminh.controller.login;

import com.anhminh.minhminh.annotation.OnLogin;
import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.UserRepository;
import com.anhminh.minhminh.service.EmailService;
import com.anhminh.minhminh.service.login.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping()
public class ForgotPasswordController {
    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ForgotPasswordController(UserRepository userRepository, OtpService otpService, EmailService emailService, JwtDecoder jwtDecoder, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.emailService = emailService;

        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestBody UserDto userDto) {
        Optional<Users> existingUser = Optional.ofNullable(userRepository.findByGmail(userDto.getGmail()));

        if (existingUser.isPresent()) {
            // Tạo mã OTP (mã xác nhận)
            String otp = otpService.generateOtp(); // Hàm này sẽ tạo một mã xác nhận ngẫu nhiên

            // Lưu OTP vào hệ thống (tạm thời hoặc kèm theo thời hạn)
            otpService.saveOtp(userDto.getGmail(), otp);

            // Gửi OTP qua email
            emailService.sendOtp(userDto.getGmail(), otp);

            return ResponseEntity.ok("Mã xác nhận đã được gửi tới email của bạn.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại.");
        }
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, Object> payload) {
        String gmail = (String) payload.get("gmail");
        String otp = (String) payload.get("otp");
        boolean isValidOtp = otpService.validateOtp(gmail, otp); // Kiểm tra OTP hợp lệ

        if (isValidOtp) {
            return ResponseEntity.ok("OTP hợp lệ!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP không hợp lệ hoặc đã hết hạn.");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@Validated(OnLogin.class) @RequestBody UserDto userDto) {

        Optional<Users> existingUser = Optional.ofNullable(userRepository.findByGmail(userDto.getGmail()));

        if (existingUser.isPresent()) {
            Users user = existingUser.get();
            user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Mã hóa mật khẩu mới
            userRepository.save(user);

            return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại.");
        }
    }



}
