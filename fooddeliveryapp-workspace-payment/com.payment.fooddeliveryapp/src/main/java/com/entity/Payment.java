package com.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.request.PaymentRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id")
	private long paymentId;
	
	@Column(name = "order_id")
	private Long orderId;
	
	@Column(name = "modeofpayment")
	private String modeOfPayment;
	
	@Column(name = "payment_status")
	private String paymentStatus;
	
	@Column(name = "amount_paid")
	private Integer amountPaid;
	
	@CreationTimestamp
	@Column(name = "payment_date_time")
	private LocalDateTime paymentDateTime;
	
	
	public Payment() {
		super();
	}

	public Payment(PaymentRequest paymentRequest) {
		this.orderId  = paymentRequest.getOrderId();
		this.modeOfPayment = paymentRequest.getModeOfPayment();
		this.paymentStatus = paymentRequest.getPaymentStatus();
		this.amountPaid = paymentRequest.getAmountPaid();
	}
	
	public long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public int getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(int amountPaid) {
		this.amountPaid = amountPaid;
	}

	public LocalDateTime getPaymentDateTime() {
		return paymentDateTime;
	}

	public void setPaymentDateTime(LocalDateTime paymentDateTime) {
		this.paymentDateTime = paymentDateTime;
	}

	@Override
	public String toString() {
		return "Payment [paymentId=" + paymentId + ", orderId=" + orderId + ", modeOfPayment=" + modeOfPayment
				+ ", paymentStatus=" + paymentStatus + ", amountPaid=" + amountPaid + ", paymentDateTime="
				+ paymentDateTime + "]";
	}
}
