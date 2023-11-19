package com.back.d3n15tecback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class D3n15tecBackApplication implements WebMvcConfigurer {

	public static void main(String[] args) {

		SpringApplication.run(D3n15tecBackApplication.class, args);
	}

}
