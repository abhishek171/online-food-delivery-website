package com.entity;

import com.request.HandleOrdersRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class HandleOrders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private long orderId;
	
	@Column(name = "customer_id")
	private long customerId;
	
    @Column(name = "order_details")
	private String orderDetails;
	
	@Column(name = "order_status")
	private String orderStatus;
	
	@Column(name = "customer_address")
	private String customerAddress;
	
	@Column(name = "order_confirmation")
	private String orderConfirmation;
	
	@Column(name = "hotel_id")
	private long hotelId;
	
	public HandleOrders() {
		super();
	}
	
	public HandleOrders(HandleOrdersRequest handleOrdersRequest) {
		this.customerId = handleOrdersRequest.getCustomerId();
		this.orderDetails  = handleOrdersRequest.getOrderDetails();
		this.orderStatus = handleOrdersRequest.getOrderStatus();
		this.customerAddress = handleOrdersRequest.getCustomerAddress();
		this.orderConfirmation = handleOrdersRequest.getOrderConfirmation();
		this.hotelId = handleOrdersRequest.getHotelId();
	}
	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}
	
	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(String orderDetails) {
		this.orderDetails = orderDetails;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public String getOrderConfirmation() {
		return orderConfirmation;
	}

	public void setOrderConfirmation(String orderConfirmation) {
		this.orderConfirmation = orderConfirmation;
	}
	
	public long getHotelId() {
		return hotelId;
	}

	public void setHotelId(long hotelId) {
		this.hotelId = hotelId;
	}
	
	@Override
	public String toString() {
		return "HandleOrders [orderId=" + orderId + ", customerId=" + customerId + ", orderDetails=" + orderDetails
				+ ", orderStatus=" + orderStatus + ", customerAddress=" + customerAddress + ", orderConfirmation="
				+ orderConfirmation + ", hotelId=" + hotelId + "]";
	}


}
