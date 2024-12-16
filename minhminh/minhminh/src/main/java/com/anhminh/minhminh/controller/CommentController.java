package com.anhminh.minhminh.controller;

import com.anhminh.minhminh.dto.CommentDto;
import com.anhminh.minhminh.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/up")
    public ResponseEntity<String> commentUp(@RequestBody CommentDto commentDto) {
        commentService.cmtUpService(commentDto);
        return ResponseEntity.ok("Đã comment!");
    }

    @DeleteMapping("/delComment/{id}")
    public ResponseEntity<String> delComment(@PathVariable Long id) {
        commentService.deleteCmt(id);
        return ResponseEntity.ok("Đã comment!");
    }

    @GetMapping("/numberComment/{id}")
    public ResponseEntity<Integer> numberComment(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.numberCmt(id));
    }

    @GetMapping("/allComment/{id}")
    public ResponseEntity<List<CommentDto>> getAllComment(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.getCmt(id));
    }
}
