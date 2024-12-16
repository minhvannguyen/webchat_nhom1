package com.anhminh.minhminh.service;

import com.anhminh.minhminh.dto.PostDto;
import com.anhminh.minhminh.exception.ResourceNotFoundException;
import com.anhminh.minhminh.mapper.PostMap;
import com.anhminh.minhminh.module.Posts;
import com.anhminh.minhminh.module.Users;
import com.anhminh.minhminh.repository.PostRepository;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostMap postMap;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, PostMap postMap) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postMap = postMap;
    }

    public void postUpService(PostDto postDto, Long idUser) {
        Users user = userRepository.findById(idUser)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Posts posts = postMap.toEntity(postDto);
        posts.setUser(user);
        postRepository.save(posts);
    }
    public List<PostDto> allPost(Long idUser) {
        List<PostDto> postDtoList = new ArrayList<>();
        List<Posts> postsList = postRepository.findByUser_Id(idUser); // Tìm tất cả bài đăng theo userId

        for (Posts posts : postsList) {
            PostDto postDto = postMap.toDto(posts);
            postDtoList.add(postDto);
        }

        return postDtoList;
    }

    public void deletePost(Long id) {
        Optional<Posts> posts = postRepository.findById(id);
        if(posts.isPresent()) {
            postRepository.deleteById(id);
        }
        else throw new ResourceNotFoundException("Bài đăng này không tồn tại!");
    }
    public PostDto findPost(Long id) {
        Optional<Posts> posts = postRepository.findById(id);
        return posts.map(postMap::toDto).orElseThrow(() -> new ResourceNotFoundException("Post này còn ko tồn tại!"));
    }

    public Page<Posts> getRecentPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // Tạo Pageable đúng
        return postRepository.findAllByOrderByIdPostDesc(pageable);
    }
}
