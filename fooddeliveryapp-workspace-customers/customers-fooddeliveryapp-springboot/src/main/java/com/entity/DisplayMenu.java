package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.DisplayMenuRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class DisplayMenu {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private int menuId;
	
	@Column(name = "hotel_name")
	private String hotelName;
	
	@Column(name = "dish_name")
	private String dishName;
	
	@Column(name = "photo")
	private String photoUrl;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "categories")
	private String categories;
	
	@Column(name = "discount")
	private int discount;
	
	@Column(name = "price")
	private int price;
	
	public DisplayMenu() {
		super();
	}

	public DisplayMenu(DisplayMenuRequest displayMenuRequest) {
		this.hotelName = displayMenuRequest.getHotelName();
		this.dishName = displayMenuRequest.getDishName().toLowerCase();
		this.photoUrl = displayMenuRequest.getPhotoUrl();
		this.description = displayMenuRequest.getDescription();
		this.categories = displayMenuRequest.getCategories().toLowerCase();
		this.discount = displayMenuRequest.getDiscount();
		this.price = displayMenuRequest.getPrice();
	}

	public String getHotelName() {
		return hotelName;
	}

	public String getDishName() {
		return dishName;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public String getDescription() {
		return description;
	}

	public String getCategories() {
		return categories;
	}

	public int getDiscount() {
		return discount;
	}

	public int getPrice() {
		return price;
	}


	@Override
	public String toString() {
		return "DisplayMenu [hotelName=" + hotelName + ", dishName=" + dishName + ", photoUrl="
				+ photoUrl + ", description=" + description + ", categories=" + categories + ", discount=" + discount
				+ ", price=" + price + "]";
	}
	
}
