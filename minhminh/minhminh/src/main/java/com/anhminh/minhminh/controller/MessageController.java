package com.anhminh.minhminh.controller;

import com.anhminh.minhminh.dto.MessageDto;
import com.anhminh.minhminh.service.messageserver.MessageService;
import com.anhminh.minhminh.dto.ResponseWebSocket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // API để gửi tin nhắn
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public MessageDto sendMessage(MessageDto messageDto) {
        return messageService.saveMessage(messageDto);
    }

    // API để lấy danh sách tin nhắn giữa hai người
    @GetMapping("/allMessages/{idConversation}")
    public ResponseEntity<List<ResponseWebSocket>> getMessagesByConversation(
            @PathVariable Long idConversation,
            @RequestParam(defaultValue = "0") int page, // Trang mặc định là 0
            @RequestParam(defaultValue = "20") int size) { // Số tin nhắn mặc định mỗi trang là 20
        List<ResponseWebSocket> messages = messageService.getMessagesByConversation(idConversation, page, size);
        return ResponseEntity.ok(messages);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {

        messageService.deleteMessage(id);
        return ResponseEntity.ok("Xoá thành công!");
    }

    @GetMapping("/allConversation")
    public ResponseEntity<Page<ResponseWebSocket>> getConversations(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ResponseWebSocket> conversations = messageService.getConversationsWithOtherUsers(
                userId, PageRequest.of(page, size));
        return ResponseEntity.ok(conversations);
    }

}

