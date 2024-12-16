package com.anhminh.minhminh.controller;

import com.anhminh.minhminh.dto.FollowersDto;
import com.anhminh.minhminh.dto.UserDto;
import com.anhminh.minhminh.service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {
    private final FollowerService followerService;

    @Autowired
    public FollowController(FollowerService followerService) {
        this.followerService = followerService;
    }

    @PostMapping
    public ResponseEntity<String> followed(@RequestBody FollowersDto followersDto) {
        followerService.followedService(followersDto);
        return ResponseEntity.ok("Đã theo dõi!");
    }

    @DeleteMapping("/unFollow")
    public ResponseEntity<String> unFollow(@RequestBody FollowersDto followersDto) {
        return followerService.deleteFollow(followersDto);
    }

    @GetMapping("/numberFollower/{id}")
    public ResponseEntity<Integer> numberFollower(@PathVariable Long id) {
        return ResponseEntity.ok(followerService.numberFollower(id));
    }

    @GetMapping("/numberFollowed/{id}")
    public ResponseEntity<Integer> numberFollowed(@PathVariable Long id) {
        return ResponseEntity.ok(followerService.numberFollowed(id));
    }

    @GetMapping("/allFollower/{id}")
    public ResponseEntity<List<UserDto>> getAllFollower(@PathVariable Long id) {
        return ResponseEntity.ok(followerService.getFollowers(id));
    }

    @GetMapping("/allFollowed/{id}")
    public ResponseEntity<List<UserDto>> getAllFollowed(@PathVariable Long id) {
        return ResponseEntity.ok(followerService.getFollowed(id));
    }

    @PostMapping("isFollowed")
    public ResponseEntity<Boolean> isFollowed(@RequestBody FollowersDto followersDto) {
        return ResponseEntity.ok(followerService.isfollowedService(followersDto));
    }
}
