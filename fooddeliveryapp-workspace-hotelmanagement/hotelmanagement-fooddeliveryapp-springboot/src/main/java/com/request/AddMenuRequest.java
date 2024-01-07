package com.request;

import java.io.File;
import java.io.IOException;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

public class AddMenuRequest {
	private static final String folderPath = "C:/Users/abhis/OneDrive/Desktop/fooddeliveryapp-frontend/online-food-delivery-app/public/image/menu-image/";
	
	private Long id;
	
	private String hotel_name;
	
	private String dish_name;
	
	private MultipartFile photo;
	
	private String description;
	
	private String categories;
	
	private long discount;
	
	private long price;
	
	private String cuisine;
	
	private String foodType;
	
	private String imageName;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getHotel_name() {
		return hotel_name;
	}


	public void setHotel_name(String hotel_name) {
		this.hotel_name = hotel_name;
	}


	public String getDish_name() {
		return dish_name;
	}


	public void setDish_name(String dish_name) {
		this.dish_name = dish_name;
	}

	
	public MultipartFile getPhoto() {
		return photo;
	}


	public void setPhoto(MultipartFile photo) {
		this.photo = photo;
		setImageName(this.photo);
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

	public long getDiscount() {
		return discount;
	}


	public void setDiscount(long discount) {
		this.discount = discount;
	}


	public long getPrice() {
		return price;
	}


	public void setPrice(long price) {
		this.price = price;
	}


	public String getCuisine() {
		return cuisine;
	}


	public void setCuisine(String cuisine) {
		this.cuisine = cuisine;
	}


	public String getFoodType() {
		return foodType;
	}


	public void setFoodType(String foodType) {
		this.foodType = foodType;
	}


	public String getImageName() {
		return imageName;
	}


	public void setImageName(MultipartFile image) {
		this.imageName = StringUtils.cleanPath(image.getOriginalFilename());
		try {
			image.transferTo(new File(folderPath + this.imageName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
	}

}
