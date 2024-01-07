package com.entity;



import com.request.DeliveryInfoRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "deliveryinfo")
public class DeliveryInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "delivery_id")
	private long deliveryId;
	
	@Column(name = "order_id")
	private long orderId;
	
	@Column(name = "deliveryperson_id")
	private long deliveryPersonId;
	
	@Column(name = "delivery_status")
	private String deliveryStatus;
	
	public DeliveryInfo() {
		super();
	}

	public DeliveryInfo(DeliveryInfoRequest deliveryInfoRequest) {
		this.orderId = deliveryInfoRequest.getOrderId();
		this.deliveryPersonId = deliveryInfoRequest.getDeliveryPersonId();
		this.deliveryStatus = deliveryInfoRequest.getDeliveryStatus();
	}
	public long getOrderId() {
		return orderId;
	}

	public long getDeliveryPersonId() {
		return deliveryPersonId;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}
	
	@Override
	public String toString() {
		return "DeliveryInfo [deliveryId=" + deliveryId + ", orderId=" + orderId + ", deliveryPersonId="
				+ deliveryPersonId + ", deivery_status=" + deliveryStatus + "]";
	}
	
}
