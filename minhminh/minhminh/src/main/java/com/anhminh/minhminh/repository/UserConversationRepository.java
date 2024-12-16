package com.anhminh.minhminh.repository;

import com.anhminh.minhminh.module.message.UserConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConversationRepository extends JpaRepository<UserConversation, Long> {
    @Query("""
    SELECT id
    FROM UserConversation m
    JOIN m.idUser id
    WHERE m.idConversation = :conversationId AND id != :userId
    """)
    Long findSingleUserExcluding(
            @Param("conversationId") Long conversationId,
            @Param("userId") Long userId
    );

}
