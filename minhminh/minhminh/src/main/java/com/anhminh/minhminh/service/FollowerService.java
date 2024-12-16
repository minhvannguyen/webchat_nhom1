package com.anhminh.minhminh.service;

import com.anhminh.minhminh.dto.FollowersDto;
import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.mapper.FollowerMap;
import com.anhminh.minhminh.mapper.UserMap;
import com.anhminh.minhminh.module.Followers;
import com.anhminh.minhminh.repository.FollowerRepository;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FollowerService {

    private final FollowerRepository followerRepository;
    private final FollowerMap followerMap;
    private final UserRepository userRepository;
    private final UserMap userMap;

    @Autowired
    public FollowerService(FollowerRepository followerRepository, FollowerMap followerMap, UserRepository userRepository, UserMap userMap) {
        this.followerRepository = followerRepository;
        this.followerMap = followerMap;
        this.userRepository = userRepository;
        this.userMap = userMap;
    }

    public void followedService(FollowersDto followersDto) {
        Optional<Followers> followerRecord = followerRepository.findByIdFollowerAndIdFollowing(followersDto.getIdFollower(), followersDto.getIdFollowing());

        if(followerRecord.isPresent()) {
            ResponseEntity.ok("đã follow !");
        } else {
            Followers followers = followerMap.toEntity(followersDto);
            followerRepository.save(followers);
        }

    }
    public boolean isfollowedService(FollowersDto followersDto) {
        Optional<Followers> followerRecord = followerRepository.findByIdFollowerAndIdFollowing(followersDto.getIdFollower(), followersDto.getIdFollowing());
        return followerRecord.isPresent();
    }
    public ResponseEntity<String> deleteFollow(FollowersDto followersDto) {
        Optional<Followers> followerRecord = followerRepository.findByIdFollowerAndIdFollowing(
                followersDto.getIdFollower(), followersDto.getIdFollowing()
        );

        if (followerRecord.isPresent()) {
            followerRepository.deleteById(followerRecord.get().getId());
            return ResponseEntity.ok("Đã hủy theo dõi thành công!");
        } else {
            return ResponseEntity.ok("Không tồn tại theo dõi để xóa!");
        }
    }

    public int numberFollower(Long id) {
        List<Followers> followers = followerRepository.findAllByIdFollowing(id);
        return followers.size();
    }

    public int numberFollowed(Long id) {
        List<Followers> followers = followerRepository.findAllByIdFollower(id);
        return followers.size();
    }

    public List<UserDto> getFollowers(Long id) {
        // Lấy danh sách các bản ghi Followers mà idFollowing là id người dùng này
        List<Followers> followers = followerRepository.findAllByIdFollowing(id);

        // Duyệt qua danh sách Followers để lấy User từ idFollower
        return followers.stream()
                .map(f -> userRepository.findById(f.getIdFollower()).orElse(null))
                .filter(Objects::nonNull)  // Lọc bỏ những giá trị null nếu có
                .map(userMap::toDto) // Sử dụng phương thức followerMap.toDto(user) để chuyển đổi
                .toList();
    }


    public List<UserDto> getFollowed(Long id) {
        // Lấy danh sách các bản ghi Followers mà idFollower là id người dùng này
        List<Followers> followers = followerRepository.findAllByIdFollower(id);

        // Duyệt qua danh sách Followers để lấy User từ idFollower
        return followers.stream()
                .map(f -> userRepository.findById(f.getIdFollowing()).orElse(null))
                .filter(Objects::nonNull)  // Lọc bỏ những giá trị null nếu có
                .map(userMap::toDto)
                .toList();
    }


}
