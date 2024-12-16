package com.anhminh.minhminh.repository;

import com.anhminh.minhminh.module.Tyms;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TymRepository extends JpaRepository<Tyms, Long> {
    Optional<Tyms> findByIdPostAndIdUser(Long idPost, Long idUser);
    List<Tyms> findAllByIdPost(Long id);
}
