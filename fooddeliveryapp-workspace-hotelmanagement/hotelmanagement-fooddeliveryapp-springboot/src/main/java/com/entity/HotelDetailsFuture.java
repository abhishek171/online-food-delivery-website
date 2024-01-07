package com.entity;

import com.request.HotelDetailRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hotelfutureusedata")
public class HotelDetailsFuture {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hotel_id")
	private int hotel_id;
	
	@Column(name = "hotel_name")
	private String hotel_name;
	
	@Column(name = "user_id")
	private String user_id;

	@Column(name = "password")
	private String password;

	@Column(name = "street")
	private String street;

	@Column(name = "area")
	private  String area;
	
	@Column(name = "city")
	private  String city;

	@Column(name = "pincode")
	private long pincode;

	public HotelDetailsFuture() {
		super();
	}

	public HotelDetailsFuture(HotelDetailRequest hotelDetailRequest) {
		super();
		this.hotel_name = hotelDetailRequest.getHotel_name();
		this.user_id = hotelDetailRequest.getUser_id();
		this.password = hotelDetailRequest.getPassword();
		this.street = hotelDetailRequest.getStreet();
		this.area = hotelDetailRequest.getArea();
		this.city = hotelDetailRequest.getCity();
		this.pincode = hotelDetailRequest.getPincode();
	}

	public int getHotel_id() {
		return hotel_id;
	}

	public void setHotel_id(int hotel_id) {
		this.hotel_id = hotel_id;
	}

	public String getHotel_name() {
		return hotel_name;
	}

	public void setHotel_name(String hotel_name) {
		this.hotel_name = hotel_name;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public long getPincode() {
		return pincode;
	}

	public void setPincode(long pincode) {
		this.pincode = pincode;
	}

	@Override
	public String toString() {
		return "HotelDetailsFuture [hotel_id=" + hotel_id + ", hotel_name=" + hotel_name + ", user_id=" + user_id
				+ ", password=" + password + ", street=" + street + ", area=" + area + ", city=" + city + ", pincode="
				+ pincode + "]";
	}
}
