package com.request;

public class AdminRequest {
	
	private String hotelName;
	
	private int amountReceived;
	
	private long totalBalance;
	
	private long hotelId;
	
	private long admin_id;

	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName){
		this.hotelName = hotelName;
	}

	public int getAmountReceived() {
		return amountReceived;
	}

	public void setAmountReceived(Integer amountReceived) {
		this.amountReceived = amountReceived;
	}

	public long getTotalBalance() {
		return totalBalance;
	}

	public void setTotalBalance(long totalBalance) {
		this.totalBalance = totalBalance;
	}

	public long getHotelId() {
		return hotelId;
	}

	public void setHotelId(long hotelId) {
		this.hotelId = hotelId;
	}

	public long getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(long admin_id) {
		this.admin_id = admin_id;
	}
}
