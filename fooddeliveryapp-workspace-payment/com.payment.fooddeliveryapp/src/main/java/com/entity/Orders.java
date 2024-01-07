package com.entity;

import java.util.List;

public class Orders{
    private List<HotelOrder> orderFood;
    private int totalPrice;
    private int totalDishes;
    private String defaultCurrency = "inr";
    
	public Orders(List<HotelOrder> orderFood, int totalPrice, int totalDishes, String defaultCurrency) {
		super();
		this.orderFood = orderFood;
		this.totalPrice = totalPrice;
		this.totalDishes = totalDishes;
		this.defaultCurrency = defaultCurrency;
	}
	public List<HotelOrder> getOrderFood() {
		return orderFood;
	}
	public void setOrderFood(List<HotelOrder> orderFood) {
		this.orderFood = orderFood;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public int getTotalDishes() {
		return totalDishes;
	}
	public void setTotalDishes(int totalDishes) {
		this.totalDishes = totalDishes;
	}
	public String getDefaultCurrency() {
		return defaultCurrency;
	}
	public void setDefaultCurrency(String defaultCurrency) {
		this.defaultCurrency = defaultCurrency;
	}
	@Override
	public String toString() {
		return "Orders [orderFood=" + orderFood + ", totalPrice=" + totalPrice + ", totalDishes=" + totalDishes
				+ ", defaultCurrency=" + defaultCurrency + "]";
	}
	
}
