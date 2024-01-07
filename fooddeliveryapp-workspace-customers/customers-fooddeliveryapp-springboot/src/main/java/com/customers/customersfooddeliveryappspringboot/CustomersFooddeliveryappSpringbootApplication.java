package com.customers.customersfooddeliveryappspringboot;

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
@EnableJpaRepositories(basePackages = {"com.repository"})
@EntityScan(basePackages = {"com.entity"})

public class CustomersFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomersFooddeliveryappSpringbootApplication.class, args);
	}

	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
		
}
