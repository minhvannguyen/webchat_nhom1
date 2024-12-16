package com.anhminh.minhminh.repository;

import com.anhminh.minhminh.module.Followers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowerRepository extends JpaRepository<Followers, Long> {
    Optional<Followers> findByIdFollower(Long idFollower);
    Optional<Followers> findByIdFollowing(Long idFollowing);
    Optional<Followers> findByIdFollowerAndIdFollowing(Long idFollower, Long idFollowing);
    List<Followers> findAllByIdFollowing(Long idFollowing);
    List<Followers> findAllByIdFollower(Long idFollower);


}
