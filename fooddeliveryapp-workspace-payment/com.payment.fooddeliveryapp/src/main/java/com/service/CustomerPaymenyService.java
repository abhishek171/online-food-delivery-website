package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Payment;
import com.repository.PaymentRepository;
import com.request.PaymentRequest;

@Service
public class CustomerPaymenyService {
	@Autowired
	PaymentRepository paymentRepository;
	public String receivePayment(List<Payment> paymentDetails) {
		System.out.println(paymentDetails);
	    for (Payment paymentEntity : paymentDetails) {
	    	 try {
	             paymentRepository.save(paymentEntity);
	         } catch (Exception e) {
	             e.printStackTrace();
	         }
	     }
	     
	    return "Payment details received and inserted into the database";
	}
	public String updatePaymentDetails(PaymentRequest updateDetails) {
		Payment updatePaymentDetails = paymentRepository.findUserById(updateDetails.getPaymentId());
		updatePaymentDetails.setPaymentStatus("paid");
		return paymentRepository.save(updatePaymentDetails)!=null ? "Data Updated Successufully":null;
	}
	
	public List<Payment> getPaymentDetails(Long orderId) {
		return paymentRepository.findPaymentDetailsById(orderId);
	}
}
