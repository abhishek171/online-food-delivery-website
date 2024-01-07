package com.hotelmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"com.controller,com.service"})
@EnableJpaRepositories(basePackages = {"com.repository"})
@EntityScan(basePackages = {"com.entity"})
public class HotelmanagementFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelmanagementFooddeliveryappSpringbootApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bcryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
