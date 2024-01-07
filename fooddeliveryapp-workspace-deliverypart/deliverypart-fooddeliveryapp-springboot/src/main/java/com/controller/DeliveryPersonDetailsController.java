package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.DeliveryPersonDetails;
import com.request.DeliveryPersonDetailsRequest;
import com.service.DeliveryPersonDetailsService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/deliveryPersonInfo/")
public class DeliveryPersonDetailsController {

	@Autowired
	DeliveryPersonDetailsService deliveryPersonDetailsService;
	
	@CrossOrigin
	@PostMapping("deliveryPersonSignup")
	public String deliveryPersonSignup(@RequestBody DeliveryPersonDetailsRequest deliveryPersonDetailsRequest) {
		return deliveryPersonDetailsService.deliveryPersonSignup(deliveryPersonDetailsRequest);
	}
	
	@CrossOrigin
	@PostMapping("deliveryPersonLogin")
	public DeliveryPersonDetails deliveryPersonLogin(@RequestBody DeliveryPersonDetailsRequest checkLogin ,HttpSession httpSession) {
		return deliveryPersonDetailsService.deliveryPersonLogin(checkLogin,httpSession);
	}
	
	@GetMapping("deliveryPersonLogout")
	public String deliveryPersonLogout(HttpSession httpSession) {
		httpSession.invalidate();
		return "logout Successfully";
	}
	
	@GetMapping("getAllDeliveryPersonInfo")
	public List<DeliveryPersonDetails> getAllDeliveryPersonInfo(){
		return deliveryPersonDetailsService.getAllDeliveryPersonInfo();
	}
	
	@CrossOrigin
	@PutMapping("updateDeliveryPersonInfo")
	public String updateDeliveryPersonInfo(@RequestBody DeliveryPersonDetailsRequest  updateDetails) {
		return deliveryPersonDetailsService.updateDeliveryPersonInfo(updateDetails);
	}
	
	@CrossOrigin
	@PutMapping("updateDeliveryPersonDetails")
	public String updateDeliveryPersonPassword(@RequestBody DeliveryPersonDetailsRequest updateDetails) {
		return deliveryPersonDetailsService.updateDeliveryPersonPassword(updateDetails);
	}
	
	@GetMapping("getDeliveryPersonInfoById/{id}")
	public Optional<DeliveryPersonDetails> getDeliveryPersonInfoById(@PathVariable long id){
		return deliveryPersonDetailsService.getDeliveryPersonInfoById(id);
	}
}
