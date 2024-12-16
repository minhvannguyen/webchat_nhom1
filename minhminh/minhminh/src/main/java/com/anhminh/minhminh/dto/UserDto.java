package com.anhminh.minhminh.dto;

import java.util.Date;

import com.anhminh.minhminh.annotation.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDto {
    private Long id;

    @NotBlank(message = "Tên không được để trống.", groups = {OnRegister.class, OnUpdate.class})
    @Size(min = 3, max = 20, message = "Tên nên có từ 3 -20 ký tự", groups = {OnRegister.class, OnUpdate.class})
    private String userName;
    private String firstName;

    @NotBlank(message = "Email không được để trống!", groups = {OnRegister.class, OnLogin.class})
    @Email(message = "Email không đúng định dạng!", groups = {OnRegister.class, OnLogin.class})
    @IsEmailExists(message = "email đã tồn tại!", groups = {OnRegister.class})
    private String gmail;

    @NotBlank(message = "Password không được để trống!", groups = {OnRegister.class, OnLogin.class})
    @Size(min = 6, message = "Password phải có ít nhất 6 ký tự!", groups = {OnRegister.class, OnLogin.class})
    private String password;
    private String address;
    private String bio;
    private Date date;
    private String avatar;
    private String isSingle;

    public UserDto() {
        //đây là constructor ko tham số cho rõ ràng logic
    }

    public UserDto(String gmail, String password) {
        this.gmail = gmail;
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getIsSingle() {
        return isSingle;
    }

    public void setIsSingle(String isSingle) {
        this.isSingle = isSingle;
    }
}
