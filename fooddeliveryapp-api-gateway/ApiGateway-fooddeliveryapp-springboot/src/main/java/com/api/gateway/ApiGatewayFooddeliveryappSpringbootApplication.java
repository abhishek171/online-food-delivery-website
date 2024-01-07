package com.api.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayFooddeliveryappSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayFooddeliveryappSpringbootApplication.class, args);
	}

}
