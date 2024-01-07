package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.CustomerDetails;
import com.entity.CustomerDetailsFuture;
import com.request.CustomerDetailsRequest;
import com.service.CustomerDetailsService;


@RestController
@RequestMapping("/customerDetails/")
public class CustomerDetailsController {
	@Autowired
	CustomerDetailsService customerDetailsService;
	
	@CrossOrigin
	@PostMapping("signup")
	public String customerSignUp(@ModelAttribute CustomerDetailsRequest customerDetailsRequest) {
		return customerDetailsService.createCustomer(customerDetailsRequest);
	}
	
	@CrossOrigin
	@GetMapping("allCustomers")
	public List<CustomerDetails> getAllCurrentCustomers(){
		return customerDetailsService.getAllCustomers();
	}
	
	@GetMapping("allCustomersFuture")
	public List<CustomerDetailsFuture> getAllFutureCustomersList(){
		return customerDetailsService.getAllFutureCustomersList();
	}
	
	@CrossOrigin
	@PostMapping("login")
	public CustomerDetails customerAuthentication(@RequestBody CustomerDetailsRequest custDetailsRequest) {
		return customerDetailsService.customerAuthentication(custDetailsRequest);
	}
	
	@CrossOrigin
	@PutMapping("updateData")
	public String updateCustomerDetails(@RequestBody CustomerDetailsRequest customerDetailsRequest) {
		return customerDetailsService.updateCustomerDetails(customerDetailsRequest);
	}
	@CrossOrigin
	@PutMapping("updateUserDetails")
	public String updateCustomerPassword(@RequestBody CustomerDetailsRequest customerDetailsRequest) {
		return customerDetailsService.updateCustomerPassword(customerDetailsRequest);
		
	}

}
