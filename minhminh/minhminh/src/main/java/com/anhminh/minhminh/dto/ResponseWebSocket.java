package com.anhminh.minhminh.dto;

import java.time.LocalDateTime;

public class ResponseWebSocket {
    private Long idSender;
    private Long idConversation;// ID cuộc hội thoại
    private String content;
    private LocalDateTime time;
    private String userName;
    private String avatar;
    private Long idCilent;

    public Long getIdCilent() {
        return idCilent;
    }

    public void setIdCilent(Long idCilent) {
        this.idCilent = idCilent;
    }

    public Long getIdSender() {
        return idSender;
    }

    public void setIdSender(Long idSender) {
        this.idSender = idSender;
    }

    public Long getIdConversation() {
        return idConversation;
    }

    public void setIdConversation(Long idConversation) {
        this.idConversation = idConversation;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
