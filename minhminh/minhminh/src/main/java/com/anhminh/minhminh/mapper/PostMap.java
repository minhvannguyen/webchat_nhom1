package com.anhminh.minhminh.mapper;

import com.anhminh.minhminh.dto.PostDto;
import com.anhminh.minhminh.module.Posts;
import org.springframework.stereotype.Component;

@Component
public class PostMap {
    public Posts toEntity(PostDto postDto) {
        Posts posts = new Posts();
        posts.setIdPost(postDto.getIdPost());
        posts.setContent(postDto.getContent());
        posts.setDate(postDto.getDate());
        posts.setImageUrl(postDto.getImageUrl());
        return posts;
    }
    public PostDto toDto(Posts post) {
        PostDto postDto = new PostDto();
        postDto.setIdPost(post.getIdPost());
        postDto.setContent(post.getContent());
        postDto.setDate(post.getDate());
        postDto.setImageUrl(post.getImageUrl());
        

        return postDto;
    }
}
