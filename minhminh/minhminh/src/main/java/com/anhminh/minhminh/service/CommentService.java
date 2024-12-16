package com.anhminh.minhminh.service;

import com.anhminh.minhminh.dto.CommentDto;
import com.anhminh.minhminh.exception.ResourceNotFoundException;
import com.anhminh.minhminh.mapper.CommentMap;
import com.anhminh.minhminh.module.*;
import com.anhminh.minhminh.repository.CommentRepository;
import com.anhminh.minhminh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMap commentMap;
    private final UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, CommentMap commentMap, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.commentMap = commentMap;
        this.userRepository = userRepository;
    }

    public void cmtUpService(CommentDto commentDto) {
        Comments comments = commentMap.toEntity(commentDto);
        commentRepository.save(comments);
    }

    public void deleteCmt(Long id) {
        Optional<Comments> comments = commentRepository.findById(id);
        if(comments.isPresent()) {
            commentRepository.deleteById(id);
        }
        else throw new ResourceNotFoundException("comment này không tồn tại!");
    }

    public int numberCmt(Long id) {
        List<Comments> comments = commentRepository.findAllByIdPost(id);
        return comments.size();
    }

    public List<CommentDto> getCmt(Long id) {
        // Lấy danh sách các bản ghi Comments theo id bài đăng (idPost)
        List<Comments> comments = commentRepository.findAllByIdPost(id);

        // Duyệt qua danh sách Comments và kết hợp thông tin của User vào CommentDto
        return comments.stream()
                .map(comment -> {
                    // Lấy thông tin User từ idFollower (người bình luận)
                    Users user = userRepository.findById(comment.getIdUser()).orElse(null);
                    if (user == null) {
                        return null; // Bỏ qua nếu user không tồn tại
                    }
                    // Chuyển đổi sang CommentDto
                    CommentDto cmtdto = new CommentDto();
                    cmtdto.setIdComent(comment.getIdComent());
                    cmtdto.setContent(comment.getContent());
                    cmtdto.setIdUser(user.getId());
                    cmtdto.setUsername(user.getUserName());
                    cmtdto.setUserAvatar(user.getAvatar());
                    cmtdto.setIdPost(comment.getIdPost());
                    return cmtdto;
                })
                .filter(Objects::nonNull) // Lọc bỏ những giá trị null nếu có
                .toList();
    }

}
