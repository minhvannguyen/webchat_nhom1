package com.anhminh.minhminh.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tyms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTym;
    private Long idUser;
    private Long idPost;

    public Long getIdTym() {
        return idTym;
    }

    public void setIdTym(Long idTym) {
        this.idTym = idTym;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }
}
