package com.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.request.AdminPaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@RestController
@RequestMapping("/hotelPayment/")
public class HotelPaymentAcceptController {

	@Value("${stripe.apikey}")
    private String stripeSecretKey;

	@CrossOrigin
	 @PostMapping("hotelCreatePaymentIntent")
	    public String createPaymentIntent(@RequestBody AdminPaymentRequest paymentDetails) {
	        try {
	            Stripe.apiKey = stripeSecretKey;
	            String adminName = paymentDetails.getAdminName();
	            int amountPaid = paymentDetails.getAmountReceived()*100; 
	            System.out.println(amountPaid);
	            Map<String, Object> params = new HashMap<>();
	            params.put("amount", amountPaid);
	            params.put("currency", "INR");
	            params.put("description", "Payment for " + adminName);

	            PaymentIntent paymentIntent = PaymentIntent.create(params);

	            return paymentIntent.getClientSecret();
	        } catch (StripeException e) {
	            e.printStackTrace();
	            return "Error creating PaymentIntent";
	        }
	    }
}
