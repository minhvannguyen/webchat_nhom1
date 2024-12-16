package com.anhminh.minhminh.module.message;


import com.anhminh.minhminh.module.Users;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class UserConversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int role;

    // Liên kết với Conversation
    @Column(nullable = false)
    private Long idConversation;

    // Liên kết với User
    @ElementCollection
    @CollectionTable(
            name = "user_conversation_users", // Tên bảng để lưu danh sách ID
            joinColumns = @JoinColumn(name = "conversation_id")
    )
    @Column(name = "users_id") // Cột trong bảng trung gian lưu ID user
    private List<Long> idUser = new ArrayList<>();

    public List<Long> getIdUser() {
        return idUser;
    }

    public void setIdUser(List<Long> idUser) {
        this.idUser = idUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdConversation() {
        return idConversation;
    }

    public void setIdConversation(Long idConversation) {
        this.idConversation = idConversation;
    }


    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}

