package com.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.DeliveryInfo;
import com.request.DeliveryInfoRequest;
import com.service.DeliveryInfoService;

@RestController
@RequestMapping("/deliveryInfo/")
public class DeliveryInfoController {
	
	@Autowired
	DeliveryInfoService deliveryInfoService;
	
	@GetMapping("getAllOrders")
	public List<DeliveryInfo> getAllOrders(){
		return deliveryInfoService.getAllOrders();
	}
	
	@GetMapping("getAllOrdersDelivered")
	public List<DeliveryInfo> getAllOrdersDelivered(){
		return deliveryInfoService.getAllOrdersDelivered();
	}
	
	@PostMapping("assignOrdersToDeliveryPerson")
	public String assignDeliveryPerson(@RequestBody DeliveryInfoRequest deliveryInfoRequest) {
		return deliveryInfoService.assignDeliveryPerson(deliveryInfoRequest);
	}
}
