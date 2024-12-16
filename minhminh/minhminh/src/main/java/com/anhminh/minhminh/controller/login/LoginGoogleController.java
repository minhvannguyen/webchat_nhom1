package com.anhminh.minhminh.controller.login;
import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.exception.ExpiredTokenException;
import com.anhminh.minhminh.mapper.UserMap;
import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.UserRepository;
import com.anhminh.minhminh.service.login.AuthResponse;
import com.anhminh.minhminh.service.login.LoginService;
import com.anhminh.minhminh.service.token.CreateToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/oauth2")
public class LoginGoogleController {

    private final UserRepository userRespository;
    private JwtDecoder jwtDecoder; // Giải mã JWT từ token Google
    private final CreateToken createToken;
    private final LoginService loginService;
    private final UserMap userMap;
    @Autowired
    public LoginGoogleController(UserRepository userRespository, CreateToken createToken, LoginService loginService, JwtDecoder jwtDecoder, UserMap userMap) {
        this.userRespository = userRespository;
        this.createToken = createToken;
        this.loginService = loginService;
        this.jwtDecoder = jwtDecoder;
        this.userMap = userMap;
    }




    @PostMapping("/callback/google")
    public ResponseEntity<Object> googleLogin(@RequestBody AuthResponse authResponse) {
        try {
            // Giải mã và xác thực token
            OAuth2AccessToken accessToken = validateToken(authResponse.getToken());

            // Lấy thông tin người dùng từ token
            String email = getUserEmailFromToken(accessToken);
            String name = getUserNameFromToken(accessToken);
            String tokenServer = createToken.generateToken(email);
            Optional<Users> existingUser = Optional.ofNullable(userRespository.findByGmail(email));
            if (existingUser.isPresent()) {
                // Đăng nhập người dùng đã tồn tại
                Users user = loginService.user(authResponse.getEmail());
                UserDto userDto = userMap.toDto(user);
                return ResponseEntity.ok(new AuthResponse(tokenServer, userDto));
            } else {
                // Tạo tài khoản mới cho người dùng
                Users newUser = new Users();
                newUser.setGmail(email);
                newUser.setUserName(name);
                // Thiết lập các thông tin bổ sung nếu cần
                userRespository.save(newUser);
                Users user = loginService.user(authResponse.getEmail());
                UserDto userDto = userMap.toDto(user);
                return ResponseEntity.ok(new AuthResponse(tokenServer, userDto));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

    private OAuth2AccessToken validateToken(String token) {
        jwtDecoder = JwtDecoders.fromIssuerLocation("https://accounts.google.com");
        Jwt jwt = jwtDecoder.decode(token);

        // Nếu cần, thực hiện thêm kiểm tra (như thời gian hết hạn)
        if (Objects.requireNonNull(jwt.getExpiresAt()).isBefore(Instant.now())) {
            throw new ExpiredTokenException("Token đã hết hạn");
        }
        return new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER, token, jwt.getIssuedAt(), jwt.getExpiresAt());
    }

    private String getUserEmailFromToken(OAuth2AccessToken token) {
        String tokenValue = token.getTokenValue();

        // Giải mã JWT và lấy thông tin
        Jwt jwt = jwtDecoder.decode(tokenValue);
        return (String) jwt.getClaims().get("email");
    }

    private String getUserNameFromToken(OAuth2AccessToken token) {
        String tokenValue = token.getTokenValue();

        // Giải mã JWT và lấy thông tin
        Jwt jwt = jwtDecoder.decode(tokenValue);
        return (String) jwt.getClaims().get("name");
    }
}