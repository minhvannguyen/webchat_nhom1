package com.anhminh.minhminh.service.login;

public class UserGoogle {
    private String gmail;
    private String userName;

    public UserGoogle(String gmail, String userName) {
        this.gmail = gmail;
        this.userName = userName;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
