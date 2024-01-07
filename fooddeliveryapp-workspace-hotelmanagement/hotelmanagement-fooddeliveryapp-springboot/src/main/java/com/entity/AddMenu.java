package com.entity;

import com.request.AddMenuRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class AddMenu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private long menu_id;
	
	@Column(name = "hotel_name")
	private String hotel_name;
	
	@Column(name = "dish_name")
	private String dish_name;
	
	@Column(name = "photo")
	private String photo;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "categories")
	private String categories;
	
	@Column(name = "discount")
	private long discount;
	
	@Column(name = "price")
	private long price;

	@Column(name = "cuisine")
	private String cuisine;
	
	@Column(name = "food_type")
	private String foodType;
	public AddMenu() {
		super();
	}

	public AddMenu(AddMenuRequest addMenuRequest) {
		super();
		this.hotel_name = addMenuRequest.getHotel_name();
		this.dish_name = addMenuRequest.getDish_name();
		this.photo = addMenuRequest.getImageName();
		this.description = addMenuRequest.getDescription();
		this.categories = addMenuRequest.getCategories();
		this.discount = addMenuRequest.getDiscount();
		this.price = addMenuRequest.getPrice();
		this.cuisine = addMenuRequest.getCuisine();
		this.foodType =  addMenuRequest.getFoodType();
	}

	
	public long getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(long menu_id) {
		this.menu_id = menu_id;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
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

	@Override
	public String toString() {
		return "AddMenu [menu_id=" + menu_id + ", hotel_name=" + hotel_name + ", dish_name=" + dish_name + ", photo="
				+ photo + ", description=" + description + ", categories=" + categories + ", discount=" + discount
				+ ", price=" + price + ", cuisine=" + cuisine + ", foodType=" + foodType + "]";
	}
	
}
