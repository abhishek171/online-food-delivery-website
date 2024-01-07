package com.deliverypart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableAspectJAutoProxy
@ComponentScan(basePackages = {"com.controller,com.service"})
@EnableJpaRepositories(basePackages = {"com.repository"})
@EntityScan(basePackages = {"com.entity"})
public class DeliverypartFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliverypartFooddeliveryappSpringbootApplication.class, args);
	}

}
