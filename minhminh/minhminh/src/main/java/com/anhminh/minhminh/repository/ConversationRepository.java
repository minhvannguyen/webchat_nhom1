package com.anhminh.minhminh.repository;

import com.anhminh.minhminh.module.message.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("""
    SELECT c FROM Conversation c
    JOIN c.userConversation m
    JOIN m.idUser id
    WHERE id = :userId
""")
    Page<Conversation> findAllByUserId(Long userId, Pageable pageable);

}

