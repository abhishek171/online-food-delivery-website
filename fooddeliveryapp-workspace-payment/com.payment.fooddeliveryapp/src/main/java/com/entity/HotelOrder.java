package com.entity;

import java.util.List;

public class HotelOrder {
	 	private String hotelName;
	    private List<OrderItem> orders;
		public HotelOrder(String hotelName, List<OrderItem> orders) {
			super();
			this.hotelName = hotelName;
			this.orders = orders;
		}
		public String getHotelName() {
			return hotelName;
		}
		public void setHotelName(String hotelName) {
			this.hotelName = hotelName;
		}
		public List<OrderItem> getOrders() {
			return orders;
		}
		public void setOrders(List<OrderItem> orders) {
			this.orders = orders;
		}
		@Override
		public String toString() {
			return "HotelOrder [hotelName=" + hotelName + ", orders=" + orders + "]";
		}
	    
}
