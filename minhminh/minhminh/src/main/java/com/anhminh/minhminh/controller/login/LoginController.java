package com.anhminh.minhminh.controller.login;


import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.mapper.UserMap;
import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.service.login.AuthRequest;
import com.anhminh.minhminh.service.login.AuthResponse;
import com.anhminh.minhminh.service.token.CreateToken;
import com.anhminh.minhminh.service.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final CreateToken createToken;
    private final UserMap userMap;
    @Autowired
    public LoginController(LoginService loginService, CreateToken createToken, UserMap userMap) {
        this.loginService = loginService;
        this.createToken = createToken;
        this.userMap = userMap;
    }





    @PostMapping
    public ResponseEntity<Object> login(@RequestBody AuthRequest authRequest) {
        // Xác thực user bằng cách kiểm tra username và password
        if (loginService.validateUser(authRequest.getGmail(), authRequest.getPassword())) {
            String token = createToken.generateToken(authRequest.getGmail());
            Users user = loginService.user(authRequest.getGmail());
            UserDto userDto = userMap.toDto(user);
            return ResponseEntity.ok(new AuthResponse(token, userDto));
        } else {
            return ResponseEntity.status(401).body("Tài khoản hoặc mật khẩu không đúng!");
        }
    }
}
