package com.entity;

public class OrderItem {
	private String dishName;
    private int quantity;
    private int price;
	public OrderItem(String dishName, int quantity, int price) {
		super();
		this.dishName = dishName;
		this.quantity = quantity;
		this.price = price;
	}
	public String getDishName() {
		return dishName;
	}
	public void setDishName(String dishName) {
		this.dishName = dishName;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "OrderItem [dishName=" + dishName + ", quantity=" + quantity + ", price=" + price + "]";
	}
}
