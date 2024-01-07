package com.request;

public class HandleOrdersRequest {
	
	private long customerId;
	
	private String orderDetails;

	private String orderStatus;
	
	private String customerAddress;
	
	private String orderConfirmation;
	
	private long hotelId;
	
	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId){
			this.customerId = customerId;
	}

	public String getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(String orderDetails){
			this.orderDetails = orderDetails;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus){
			this.orderStatus = orderStatus;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress){
			this.customerAddress = customerAddress;
	}

	public String getOrderConfirmation() {
		return orderConfirmation;
	}

	public void setOrderConfirmation(String orderConfirmation){
			this.orderConfirmation = orderConfirmation;
	}

	public long getHotelId() {
		return hotelId;
	}

	public void setHotelId(long hotelId) {
		this.hotelId = hotelId;
	}
	
}
