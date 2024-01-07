package com.request;

import java.io.File;
import java.io.IOException;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

public class HotelDetailRequest {
	private final static String folderPath = "C:/Users/abhis/OneDrive/Desktop/fooddeliveryapp-frontend/online-food-delivery-app/public/image/hotel-image/";
	private Long id;
	private String hotel_name;
	private String user_id;
	private String password;
	private long total_balance;
	private MultipartFile image;
	private String area;
	private String street;
	private String city;
	private long pincode;
	private String imageName;
	
	public String getHotel_name() {
		return hotel_name;
	}
	
	public void setHotel_name(String hotel_name){
		this.hotel_name = hotel_name;
	}
	
	public String getUser_id() {
		return user_id;
	}
	
	public void setUser_id(String user_id){
		
		this.user_id = user_id;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public long getTotal_balance(){
		return total_balance;
	}
	
	public void setTotal_balance(long total_balance) {
		
			this.total_balance = total_balance;
	}
	
	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
		setImageName(image);
	}

	public String getArea() {
		return area;
	}
	public void setArea(String area){
		this.area = area ;
	}
	
	public String getStreet() {
		return street;
	}
	
	public void setStreet(String street){
		this.street = street;
	}
	
	public String getCity() {
		return city;
		
	}
	
	public void setCity(String city){
		this.city = city;
	}
	public long getPincode() {
		return pincode;
	}
	public void setPincode(long pincode) {
		this.pincode = pincode;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(MultipartFile image) {
		this.imageName = StringUtils.cleanPath(image.getOriginalFilename());
		try {
			image.transferTo(new File(folderPath+this.imageName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}


