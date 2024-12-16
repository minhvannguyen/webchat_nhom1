package com.anhminh.minhminh.module.message;

import com.anhminh.minhminh.module.Users;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // conversationId, khóa chính
    private String name; // Tên cuộc hội thoại (có thể là tên nhóm trong trường hợp nhóm)

    @OneToMany(fetch = FetchType.LAZY) // Chỉ tải khi cần
    @JoinColumn(name = "id_userConversation", nullable = false) // Tên cột trong database
    private List<UserConversation> userConversation;

    public List<UserConversation> getUserConversation() {
        return userConversation;
    }

    public void setUserConversation(List<UserConversation> userConversation) {
        this.userConversation = userConversation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

