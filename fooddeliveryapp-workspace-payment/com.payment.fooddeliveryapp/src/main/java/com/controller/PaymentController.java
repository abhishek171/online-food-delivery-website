package com.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.stripe.Stripe;
import java.util.Base64;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.entity.HotelOrder;
import com.entity.OrderItem;
import com.entity.Orders;
import com.entity.Payment;
import com.request.PaymentRequest;
import com.service.CustomerPaymenyService;

@RestController
@RequestMapping("/customerPayment/")
public class PaymentController {
	@Autowired
	CustomerPaymenyService customerPaymenyService;
	
	@Value("${stripe.apikey}")
    private String stripeSecretKey;
	
	@Value("$stripe.publishableKey")
	private String stripePublishableKey;
	
	@Autowired
	RestTemplate restTemplate;
	
	 @CrossOrigin
	 @PostMapping("createCheckout")
	 public String hostedCheckout(@RequestBody Orders orderDetails) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        String modeOfPayment = Base64.getEncoder().encodeToString("card".getBytes());
        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/billSummary/"+modeOfPayment)
                        .setCancelUrl("http://localhost:8005/customerPayment/failure");

        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        for (HotelOrder hotelOrder : orderDetails.getOrderFood()) {
        	String hotelName = (String) hotelOrder.getHotelName();
            paramsBuilder.putMetadata(hotelName, hotelName);
            for (OrderItem orderItem : hotelOrder.getOrders()) {
                lineItems.add(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity((long) orderItem.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                        		.setCurrency("INR")
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .putMetadata("product_id", UUID.randomUUID().toString())
                                                                .setName(orderItem.getDishName())
                                                                .build()
                                                )
                                                .setUnitAmount((long) (orderItem.getPrice() * 100))
                                                .build())
                                .build());
            }
	    }

	        paramsBuilder.addAllLineItem(lineItems);

	        Session session = Session.create(paramsBuilder.build());

	        return session.getId();
	}
	
    @GetMapping("failure")
    public String handleFailure() {
        return "Payment Failed!";
    }
    
    @CrossOrigin
	@PostMapping("receivePayment")
	public String receivePayment(@RequestBody List<Payment> paymentDetails) {
		return customerPaymenyService.receivePayment(paymentDetails);
	}
    
    @CrossOrigin
    @PostMapping("updatePaymentDetails")
    public String updatePaymentDetails(@RequestBody PaymentRequest updateDetails) {
    	return customerPaymenyService.updatePaymentDetails(updateDetails);
    }
    
    @CrossOrigin
    @GetMapping("getPaymentDetails/{hotelId}")
    public List<Payment> getPaymentDetails(@PathVariable Integer hotelId){
    	Long orderId = restTemplate.getForObject("http://localhost:8003/orders/getOrderId/"+hotelId,Long.class);
    	return customerPaymenyService.getPaymentDetails(orderId);
    }
}
