 package com.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.DeliveryInfo;
import com.repository.DeliveryInfoRepository;
import com.request.DeliveryInfoRequest;

@Service
public class DeliveryInfoService {
	
	@Autowired
	DeliveryInfoRepository deliveryInfoRespository;

	public List<DeliveryInfo> getAllOrders() {
		return deliveryInfoRespository.findAll();
	}
	
	public List<DeliveryInfo> getAllOrdersDelivered() {
		return deliveryInfoRespository.getAllOrdersDelivered();
	}
	
	public String assignDeliveryPerson(DeliveryInfoRequest deliveryInfoRequest) {
		deliveryInfoRequest.setDeliveryStatus("notdelivered"); 
		DeliveryInfo addDelivery = new DeliveryInfo(deliveryInfoRequest);
		deliveryInfoRespository.save(addDelivery);
		return "Delivery Info Added";
	}

	
}
