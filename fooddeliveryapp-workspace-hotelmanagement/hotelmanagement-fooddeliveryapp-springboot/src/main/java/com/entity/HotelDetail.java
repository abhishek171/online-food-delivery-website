package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.HotelDetailRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "hoteldetails")
public class HotelDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hotel_id")
	private long hotel_id;
	
	@Column(name = "hotel_name")
	private String hotel_name;
	
	@Column(name = "user_id")
	private String user_id;
	
	@JsonIgnore
	@Column(name = "password")
	private String password;
	
	@Column(name = "total_balance")
	private long total_balance;
	
	@Column(name = "hotel_image")
	private String hotel_image;
	
	@OneToOne
	@JoinColumn(name = "hotel_id",referencedColumnName = "hotel_id")
	private HotelAddress hotelAddress;

	public HotelDetail() {
		super();
	}
	
	public HotelDetail(HotelDetailRequest hotelDetailRequest) {
		this.hotel_name = hotelDetailRequest.getHotel_name();
		this.user_id = hotelDetailRequest.getUser_id();
		this.password = hotelDetailRequest.getPassword();
		this.total_balance = hotelDetailRequest.getTotal_balance();
		this.hotel_image = hotelDetailRequest.getImageName();
	}

	public long getHotel_id() {
		return hotel_id;
	}

	public void setHotel_id(long hotel_id) {
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

	public long getTotal_balance() {
		return total_balance;
	}

	public void setTotal_balance(long total_balance) {
		this.total_balance = total_balance;
	}
	
	public String getHotel_image() {
		return hotel_image;
	}

	public void setHotel_image(String hotel_image) {
		this.hotel_image = hotel_image;
	}

	public HotelAddress getHotelAddress() {
		return hotelAddress;
	}

	public void setHotelAddress(HotelAddress hotelAddress) {
		this.hotelAddress = hotelAddress;
	}

	@Override
	public String toString() {
		return "HotelDetail [hotel_id=" + hotel_id + ", hotel_name=" + hotel_name + ", user_id=" + user_id
				 + ", total_balance=" + total_balance + ", hotel_image=" + hotel_image
				+ ", hotelAddress=" + hotelAddress + "]";
	}
	
}
