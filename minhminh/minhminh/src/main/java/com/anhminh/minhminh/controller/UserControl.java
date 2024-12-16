package com.anhminh.minhminh.controller;

import com.anhminh.minhminh.annotation.OnRegister;
import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserControl {
    private final UserService userService;

    @Autowired
    public UserControl(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@Validated(OnRegister.class) @RequestBody UserDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.ok("Đăng ký thành công!");
    }

    @GetMapping("/allUser")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.allUser());
    }

    @GetMapping("/findUser/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findByIdUser(id));
    }

    @GetMapping("/findByUserName/{userName}")
    public ResponseEntity<UserDto> getUser(@PathVariable String userName) {
        return ResponseEntity.ok(userService.findByUserName(userName));
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateUser( @RequestParam("userDto") String userDtoJson, @PathVariable Long id, @RequestParam("avatar") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            UserDto userDto = objectMapper.readValue(userDtoJson, UserDto.class);

            // Tạo thư mục nếu chưa tồn tại
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            String fileUrl = "http://localhost:8080/uploads/images/" + fileName;
            userDto.setAvatar(fileUrl);

            userService.updateUser(userDto, id);

            return ResponseEntity.ok(userDto);
        } catch (IOException e) {
            e.printStackTrace(); // In chi tiết lỗi vào console
            System.err.println("Không thể chuyển đổi JSON thành UserDto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi tải ảnh lên.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Xoá thành công!");
    }
}
