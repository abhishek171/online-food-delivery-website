package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "order_id")
	private long order_id;
	
	@Column(name = "customer_id")
	private long customer_id;
	
	@Column(name = "order_details")
	private String order_details;
	
	@Column(name = "order_status")
	private String order_status;
	
	@Column(name = "customer_address")
	private String customer_address;
	
	@Column(name = "order_confirmation")
	private String order_confirmation;
	
	@Column(name = "hotel_id")
	private long hotel_id;

	
	public Orders() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(long customer_id) {
		this.customer_id = customer_id;
	}

	public String getOrder_details() {
		return order_details;
	}

	public void setOrder_details(String order_details) {
		this.order_details = order_details;
	}

	public String getOrder_status() {
		return order_status;
	}

	public void setOrder_status(String order_status) {
		this.order_status = order_status;
	}

	public String getCustomer_address() {
		return customer_address;
	}

	public void setCustomer_address(String customer_address) {
		this.customer_address = customer_address;
	}

	public String getOrder_confirmation() {
		return order_confirmation;
	}

	public void setOrder_confirmation(String order_confirmation) {
		this.order_confirmation = order_confirmation;
	}

	public long getHotel_id() {
		return hotel_id;
	}

	public void setHotel_id(long hotel_id) {
		this.hotel_id = hotel_id;
	}

	@Override
	public String toString() {
		return "Orders [order_id=" + order_id + ", customer_id=" + customer_id + ", order_details=" + order_details
				+ ", order_status=" + order_status + ", customer_address=" + customer_address + ", order_confirmation="
				+ order_confirmation + ", hotel_id=" + hotel_id + "]";
	}
}
