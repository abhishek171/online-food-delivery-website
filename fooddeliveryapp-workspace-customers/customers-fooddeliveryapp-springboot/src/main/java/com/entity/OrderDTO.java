package com.entity;

import java.util.List;
import java.util.Map;

public class OrderDTO {
	private List<Map<String, Object>> orderDetail;

	public List<Map<String, Object>> getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetail(List<Map<String, Object>> orderDetail) {
		this.orderDetail = orderDetail;
	}
	
}
