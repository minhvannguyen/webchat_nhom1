package com.anhminh.minhminh.dto;

public class FollowersDto {
    private Long id;
    private Long idFollower;
    private Long idFollowing;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdFollower() {
        return idFollower;
    }

    public void setIdFollower(Long idFollower) {
        this.idFollower = idFollower;
    }

    public Long getIdFollowing() {
        return idFollowing;
    }

    public void setIdFollowing(Long idFollowing) {
        this.idFollowing = idFollowing;
    }
}
