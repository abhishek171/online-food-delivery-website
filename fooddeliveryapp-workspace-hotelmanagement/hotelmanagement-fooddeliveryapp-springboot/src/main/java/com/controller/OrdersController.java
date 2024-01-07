package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Orders;
import com.request.OrdersRequest;
import com.service.OrdersService;

@RestController
@RequestMapping("/hotelOrders/")
public class OrdersController {
	@Autowired
	OrdersService ordersService;
	
	@GetMapping("getOrderDetails")
	public List<Orders> getOrderDetails(@RequestBody OrdersRequest getOrders) {
		return ordersService.getOrderDetails(getOrders);
	}
	@PutMapping("updateOrderStatus")
	public List<Orders> updateOrderStaus(@RequestBody OrdersRequest updateOrder) {
		return ordersService.updateOrderStatus(updateOrder);
	}
}
