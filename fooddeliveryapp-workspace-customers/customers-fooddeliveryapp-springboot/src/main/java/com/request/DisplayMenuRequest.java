package com.request;


public class DisplayMenuRequest {
	
	private String hotelName;
	
	
	private String dishName;
	
	
	private String photoUrl;
	
	
	private String description;
	
	
	private String categories;
	
	
	private int discount;
	
	
	private int price;


	public String getHotelName() {
		return hotelName;
	}


	public void setHotelName(String hotelName) {
		if(!hotelName.isEmpty()) {
			this.hotelName = hotelName;
		}
	}


	public String getDishName() {
		return dishName;
	}


	public void setDishName(String dishName) {
		this.dishName = dishName;
	}


	public String getPhotoUrl() {
		return photoUrl;
	}


	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getCategories() {
		return categories;
	}


	public void setCategories(String categories) {
		this.categories = categories;
	}


	public int getDiscount() {
		return discount;
	}


	public void setDiscount(int discount) {
		this.discount = discount;
	}


	public int getPrice() {
		return price;
	}


	public void setPrice(int price) {
		this.price = price;
	}	

}
