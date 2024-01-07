package com.request;

import java.math.BigInteger;


public class CustomerDetailsRequest {

	private long custId;
	
	private String custName;
	
	private String custPassword;
	
	private BigInteger custPhone;
	
	private String street;
	
	private String area;
	
	private String city;
	
	private int pincode;
	
	public long getCustId() {
		return custId;
	}
	public void setCustId(long custId) {
		this.custId = custId;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName){
		this.custName = custName;
	}
	public String getCustPassword() {
		return custPassword;
	}
	public void setCustPassword(String custPassword){
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
	public void setStreet(String street){
		this.street = street;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area){
		this.area = area;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city){
		this.city = city;
	}
	public int getPincode() {
		return pincode;
	}
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

}
