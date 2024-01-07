package com.entity;
import com.request.AdminRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "adminpaymentdata")
public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long user_id;

	@Column(name = "hotel_name")
	private String hotelName;
	
	@Column(name = "amount_received")
	private int amountReceived;
	
	@Column(name = "total_balance")
	private long totalBalance;
	
	@Column(name = "hotel_id")
	private long hotelId;
	
	@Column(name = "admin_id")
	private long admin_id;
	
	public Admin() {
		super();
	}

	public Admin(AdminRequest adminRequest) {
		this.hotelName = adminRequest.getHotelName();
		this.amountReceived = adminRequest.getAmountReceived();
		this.totalBalance = adminRequest.getTotalBalance();
		this.hotelId =  adminRequest.getHotelId();
		this.admin_id = adminRequest.getAdmin_id();
	}
	
	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public int getAmountReceived() {
		return amountReceived;
	}

	public void setAmountReceived(int amountReceived) {
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

	@Override
	public String toString() {
		return "Admin [user_id=" + user_id + ", hotelName=" + hotelName + ", amountReceived=" + amountReceived
				+ ", totalBalance=" + totalBalance + ", hotelId=" + hotelId + ", admin_id=" + admin_id + "]";
	}
}
