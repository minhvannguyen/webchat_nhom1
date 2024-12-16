package com.anhminh.minhminh.repository;

import com.anhminh.minhminh.module.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comments, Long> {

    Optional<Comments> findByIdPost(Long idPost);
    List<Comments> findAllByIdPost(Long idPost);

    void deleteByIdPost(Long id);
}

