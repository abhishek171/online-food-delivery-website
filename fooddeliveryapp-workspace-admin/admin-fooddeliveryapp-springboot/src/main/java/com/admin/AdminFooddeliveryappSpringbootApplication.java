package com.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ComponentScan(basePackages = {"com.controller,com.service"})
@ComponentScan(basePackages = "com.request")
@EnableJpaRepositories(basePackages = {"com.repository"})
@EntityScan(basePackages = {"com.entity"})
public class AdminFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminFooddeliveryappSpringbootApplication.class, args);
	}
	
	@Bean
	public BCryptPasswordEncoder bcryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
