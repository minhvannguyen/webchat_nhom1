package com.anhminh.minhminh.service.login;

public class AuthRequest {
    private String gmail;
    private String password;

    public AuthRequest(String gmail, String password) {
        this.gmail = gmail;
        this.password = password;
    }

    public String getGmail() {
        return gmail;
    }

    public void setUserName(String userName) {
        this.gmail = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
