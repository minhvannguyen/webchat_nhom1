package com.anhminh.minhminh.controller.login;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/user/google")
    public Map<String, Object> loginGoogle(@AuthenticationPrincipal OAuth2User oauth2User) {
        // Trả về thông tin người dùng từ Google
        return oauth2User.getAttributes();
    }
}

