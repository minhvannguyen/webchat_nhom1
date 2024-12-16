package com.anhminh.minhminh.mapper;

import com.anhminh.minhminh.dto.CommentDto;
import com.anhminh.minhminh.module.Comments;
import org.springframework.stereotype.Component;

@Component
public class CommentMap {
    public Comments toEntity(CommentDto commentDto) {
        Comments comment = new Comments();

        comment.setIdComent(commentDto.getIdComent());
        comment.setIdPost(commentDto.getIdPost());
        comment.setIdUser(commentDto.getIdUser());
        comment.setContent(commentDto.getContent());

        return comment;
    }

    public CommentDto toDto(Comments comment) {
        CommentDto commentDto = new CommentDto();

        commentDto.setIdComent(comment.getIdComent());
        commentDto.setIdPost(comment.getIdPost());
        commentDto.setIdUser(comment.getIdUser());
        commentDto.setContent(comment.getContent());

        return commentDto;
    }
}
