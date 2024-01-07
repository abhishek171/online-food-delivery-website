package com.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.HandleOrders;
import com.entity.OrderDTO;
import com.repository.CustomerDetailsRepository;
import com.repository.HandleOrdersRepository;

@Service
public class HandleOrdersService {
	
	@Autowired
	HandleOrdersRepository handleOrdersRepository;
	
	@Autowired
	CustomerDetailsRepository customerDetailsRepository;
	
	public List<HandleOrders> getAllOrders() {
		return handleOrdersRepository.findAll();
	}

	public String cancelOrder(Long id) {
		HandleOrders updateOrder = handleOrdersRepository.findById(id).orElse(null);
		updateOrder.setOrderConfirmation("Cancelled");
		return handleOrdersRepository.save(updateOrder) +" "+"Order Cancelled";
	}

	public List<HandleOrders> displayOrdersByCustomerId(long customerId) {
		return handleOrdersRepository.findByCustomerId(customerId);
	}

	public List<HandleOrders> displayOrdersHotelId(long hotelId) {
		return  handleOrdersRepository.findByHotelId(hotelId);
	}

	public List<Long> acceptOrders(OrderDTO orderDetails) {
		List<Long> ids = new ArrayList<Long>();
		List<Map<String, Object>> orderDetail = orderDetails.getOrderDetail();
		for (Map<String, Object> order : orderDetail) {
            HandleOrders handleOrders = new HandleOrders();
            handleOrders.setCustomerId((Integer) order.get("customerId"));
            handleOrders.setOrderDetails((String) order.get("orderDetails"));
            handleOrders.setOrderStatus((String) order.get("orderStatus"));
            handleOrders.setCustomerAddress((String) order.get("customerAddress"));
            handleOrders.setOrderConfirmation((String) order.get("orderConfirmation"));
            handleOrders.setHotelId((Integer) order.get("hotelId"));
            HandleOrders outputOrders = handleOrdersRepository.save(handleOrders);
            ids.add((Long)outputOrders.getOrderId());
		}
		return ids.size()!=0?ids:null;
	}

	public Long getOrderIdByHotelId(long hotelId) {
		return handleOrdersRepository.findOrderIdByHotelId(hotelId);
	}

}
