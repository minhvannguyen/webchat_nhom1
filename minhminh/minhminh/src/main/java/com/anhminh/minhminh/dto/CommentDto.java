package com.anhminh.minhminh.dto;

public class CommentDto {
    private Long idComent;
    private Long idPost;
    private Long idUser;
    private String content;
    private String username;
    private String userAvatar;

    public Long getIdComent() {
        return idComent;
    }

    public void setIdComent(Long idComent) {
        this.idComent = idComent;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
