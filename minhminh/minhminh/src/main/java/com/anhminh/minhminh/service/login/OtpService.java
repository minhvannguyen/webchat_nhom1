package com.anhminh.minhminh.service.login;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
    private final Map<String, String> otpStorage = new HashMap<>();
    private final Map<String, Long> otpExpiry = new HashMap<>();

    // Lưu OTP với thời hạn (ví dụ 5 phút)
    public void saveOtp(String gmail, String otp) {
        otpStorage.put(gmail, otp);
        otpExpiry.put(gmail, System.currentTimeMillis() + 300000); // 5 phút
    }

    // Kiểm tra OTP hợp lệ
    public boolean validateOtp(String gmail, String otp) {
        Long expiryTime = otpExpiry.get(gmail);
        if (expiryTime != null && System.currentTimeMillis() <= expiryTime && otp.equals(otpStorage.get(gmail))) {
            otpStorage.remove(gmail);
            otpExpiry.remove(gmail);
            return true;
        }
        return false;
    }

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Tạo số ngẫu nhiên 6 chữ số
        return String.valueOf(otp);
    }

}

