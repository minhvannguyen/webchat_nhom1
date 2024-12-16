package com.anhminh.minhminh.controller.apiconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue/messages"); // Kênh client sẽ nhận tin nhắn
        registry.setApplicationDestinationPrefixes("/app"); // Kênh client sẽ gửi tin nhắn
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // Endpoint để kết nối WebSocket
                .setAllowedOrigins("*") // Cho phép kết nối từ mọi domain (sửa nếu cần bảo mật)
                .withSockJS(); // Hỗ trợ fallback khi WebSocket không khả dụng
    }
}

