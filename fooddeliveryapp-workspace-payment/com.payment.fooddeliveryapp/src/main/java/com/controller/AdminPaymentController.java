package com.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.request.AdminPaymentRequest;

@RestController
@RequestMapping("/adminPayment/")
public class AdminPaymentController {

	@Value("${stripe.apikey}")
    private String stripeSecretKey;

	@CrossOrigin
	 @PostMapping("createPaymentIntent")
	    public String createPaymentIntent(@RequestBody AdminPaymentRequest paymentDetails) {
	        try {
	            Stripe.apiKey = stripeSecretKey;
	            String hotelName = paymentDetails.getHotelName();
	            int amountPaid = paymentDetails.getAmountReceived()*100;
	            Map<String, Object> params = new HashMap<>();
	            params.put("amount", amountPaid);
	            params.put("currency", "INR");
	            params.put("description", "Payment for " + hotelName);

	            PaymentIntent paymentIntent = PaymentIntent.create(params);

	            return paymentIntent.getClientSecret();
	        } catch (StripeException e) {
	            e.printStackTrace();
	            return "Error creating PaymentIntent";
	        }
	    }
}
