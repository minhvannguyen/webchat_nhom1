package com.anhminh.minhminh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.anhminh.minhminh")
public class MinhminhApplication {

	public static void main(String[] args) {
		SpringApplication.run(MinhminhApplication.class, args);
	}

}
