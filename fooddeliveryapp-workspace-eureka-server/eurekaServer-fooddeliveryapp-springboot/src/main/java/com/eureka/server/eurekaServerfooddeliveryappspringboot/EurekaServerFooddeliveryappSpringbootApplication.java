package com.eureka.server.eurekaServerfooddeliveryappspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaServerFooddeliveryappSpringbootApplication.class, args);
	}

}
