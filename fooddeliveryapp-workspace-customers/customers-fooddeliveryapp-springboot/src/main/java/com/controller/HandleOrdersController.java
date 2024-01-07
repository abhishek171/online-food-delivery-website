package com.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.entity.HandleOrders;
import com.entity.OrderDTO;
import com.service.HandleOrdersService;

@RestController
@RequestMapping("/orders/")
public class HandleOrdersController {
	
	@Autowired
	HandleOrdersService handleOrdersService;
	
	@Autowired
	RestTemplate restTemplate;
	
	@CrossOrigin
	@PostMapping("acceptOrders")
	public List<Long> acceptOrders(@RequestBody OrderDTO orderDetails) {
		return handleOrdersService.acceptOrders(orderDetails);
	}
	
	@GetMapping("displayAll")
	public List<HandleOrders> getAllOrders(){
		return handleOrdersService.getAllOrders();
	}
	
	@PutMapping("cancelOrder/{id}")
	public String cancelOrder(@PathVariable long id) {
		return handleOrdersService.cancelOrder(id);	
	}
	
	@GetMapping("displayOrdersByCustomerId/{customerId}")
	public List<HandleOrders> displayOrdersByCustomerId(@PathVariable long customerId){
		return handleOrdersService.displayOrdersByCustomerId(customerId);
	}
	
	@GetMapping("displayOrdersByHotelId/{hotelId}")
	public List<HandleOrders> displayOrdersByHotelId(@PathVariable long hotelId){
		return handleOrdersService.displayOrdersHotelId(hotelId);
	}
	
	@GetMapping("getOrderId/{hotelId}")
	public Long getOrderIdByHotelId(@PathVariable long hotelId) {
		return handleOrdersService.getOrderIdByHotelId(hotelId);
	}
	@GetMapping("getMessage/")
	public String displayMessage() {
		String adminMessage = restTemplate.getForObject("http://localhost:8001/admin/paymentMessage",String.class);
		String hotelMessage = restTemplate.getForObject("http://localhost:8002/hotelManagement/paymentMessage", String.class);
		return adminMessage.isBlank()?hotelMessage:adminMessage ;	
	}
	
}
