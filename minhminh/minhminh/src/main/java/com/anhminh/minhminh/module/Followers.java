package com.anhminh.minhminh.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Followers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
