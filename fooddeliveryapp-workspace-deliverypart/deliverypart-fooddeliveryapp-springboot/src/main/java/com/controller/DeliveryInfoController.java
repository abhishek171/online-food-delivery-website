package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.DeliveryInfo;
import com.service.DeliveryInfoService;

@RestController
@RequestMapping("/deliveryInfo/")
public class DeliveryInfoController {

	@Autowired
	DeliveryInfoService deliveryInfoService;
	
	@CrossOrigin
	@PutMapping("updateDeliveryStatus")
	private String updateDeliveryStatus(@RequestBody DeliveryInfo updateDeliveryInfo) {
		return deliveryInfoService.updateDeliveryInfo(updateDeliveryInfo);
	}
	
	@GetMapping("getUndeliveredOrderInfo/{deliveryPersonId}")
	private List<DeliveryInfo> getUndeliveredOrderInfo(@PathVariable long deliveryPersonId){
		return deliveryInfoService.getUndeliveredOrderInfo(deliveryPersonId);
	}
}
