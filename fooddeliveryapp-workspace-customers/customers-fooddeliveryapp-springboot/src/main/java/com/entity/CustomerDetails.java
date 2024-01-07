package com.entity;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.CustomerDetailsRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; 

@Entity
@Table(name="customer")
public class CustomerDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id")
	private int customerId;
	
	@Column(name = "customer_name")
	private String custName;
	@JsonIgnore
	@Column(name = "customer_password")
	private String custPassword;
	
	@Column(name = "customer_phone")
	private BigInteger custPhone;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "area")
	private String area;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "pincode")
	private int pincode;
	
	public CustomerDetails() {
		super();
	}
	
	public CustomerDetails(CustomerDetailsRequest customerDetailsRequest) {
		super();
		this.custName = customerDetailsRequest.getCustName();
		this.custPassword = customerDetailsRequest.getCustPassword();
		this.custPhone = customerDetailsRequest.getCustPhone();
		this.street = customerDetailsRequest.getStreet();
		this.area = customerDetailsRequest.getArea();
		this.city = customerDetailsRequest.getCity();
		this.pincode = customerDetailsRequest.getPincode();
	}

	
	public int getCustId() {
		return customerId;
	}

	public void setCustId(int custId) {
		this.customerId = custId;
	}
	
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustPassword() {
		return custPassword;
	}

	public void setCustPassword(String custPassword) {
		this.custPassword = custPassword;
	}

	public BigInteger getCustPhone() {
		return custPhone;
	}

	public void setCustPhone(BigInteger custPhone) {
		this.custPhone = custPhone;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	@Override
	public String toString() {
		return "CustomerDetails [custId=" + customerId + ", custName=" + custName + ", custPhone=" + custPhone + ", street="
				+ street + ", area=" + area + ", city=" + city + ", pincode=" + pincode + "]";
	}

}
