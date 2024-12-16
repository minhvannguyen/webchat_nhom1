package com.anhminh.minhminh.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsEmailExistsValidator.class) // Liên kết với lớp kiểm tra
public @interface IsEmailExists {
    String message() default "trùng email!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

