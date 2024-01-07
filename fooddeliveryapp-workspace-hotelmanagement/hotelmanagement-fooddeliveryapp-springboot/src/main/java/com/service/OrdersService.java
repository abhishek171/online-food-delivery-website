package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Orders;
import com.repository.OrdersRepository;
import com.request.OrdersRequest;

@Service
public class OrdersService {
	@Autowired
	OrdersRepository ordersRepository;
	public List<Orders> updateOrderStatus(OrdersRequest updateOrder) {
		Orders existingOrder = ordersRepository.findByHotelId(updateOrder.getHotel_id());
		if(existingOrder!=null) {
			existingOrder.setOrder_status("Ready");
			ordersRepository.save(existingOrder);
			return ordersRepository.getOrdersById(updateOrder.getHotel_id());
		}else {
			return null;
		}	
	}
	
	public List<Orders> getOrderDetails(OrdersRequest getOrders) {
		return ordersRepository.findByHotelIdAndStatusNotReady(getOrders.getHotel_id())!=null?ordersRepository.findByHotelIdAndStatusNotReady(getOrders.getHotel_id()):null;
	}

}
