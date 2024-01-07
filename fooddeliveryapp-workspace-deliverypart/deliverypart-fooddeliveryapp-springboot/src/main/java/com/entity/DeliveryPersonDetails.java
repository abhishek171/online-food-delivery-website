 package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.DeliveryPersonDetailsRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "deliveryperson")
public class DeliveryPersonDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deliveryperson_id")
	private long deliveryPersonId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "user_id")
	private String userId;
	
	@JsonIgnore
	@Column(name = "password")
	private String password;
	
	@Column(name = "contact_no")
	private long contactNo;
	
	
	public DeliveryPersonDetails() {
		super();
	}

	public DeliveryPersonDetails(DeliveryPersonDetailsRequest deliveryPersonRequest) {
		this.name = deliveryPersonRequest.getName();
		this.userId = deliveryPersonRequest.getUserId();
		this.password = deliveryPersonRequest.getPassword();
		this.contactNo = deliveryPersonRequest.getContactNo();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getContactNo() {
		return contactNo;
	}

	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}

	@Override
	public String toString() {
		return "DeliveryPersonDetails [deliveryPersonId=" + deliveryPersonId + ", name=" + name + ", userId=" + userId
				+", contactNo=" + contactNo + "]";
	}
}
