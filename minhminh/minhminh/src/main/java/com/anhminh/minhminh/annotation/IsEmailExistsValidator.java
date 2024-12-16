package com.anhminh.minhminh.annotation;

import com.anhminh.minhminh.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class IsEmailExistsValidator implements ConstraintValidator<IsEmailExists, String> {
    private final UserRepository userRepository;
    @Autowired
    public IsEmailExistsValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public boolean isValid(String gmail, ConstraintValidatorContext context) {
        return !userRepository.existsByGmail(gmail); // Kiểm tra sự tồn tại của ID
    }
}
