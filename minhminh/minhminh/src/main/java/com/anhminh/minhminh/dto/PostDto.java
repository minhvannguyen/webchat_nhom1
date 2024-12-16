package com.anhminh.minhminh.dto;

import com.anhminh.minhminh.module.Posts;

public class PostDto {
    private Long idPost;
    private String content;
    private String imageUrl;
    private String date;
    private String avatar;
    private String userName;

    public PostDto() {
    }

    public PostDto(Posts posts) {
        this.setImageUrl(posts.getImageUrl());
        this.setContent(posts.getContent());
        this.setDate(posts.getDate());
        this.setIdPost(posts.getIdPost());
        this.setAvatar(posts.getUser().getAvatar());
        this.setUserName(posts.getUser().getUserName());
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
