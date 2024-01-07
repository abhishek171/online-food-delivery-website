package com.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.entity.Admin;
import com.entity.AdminDetails;
import com.request.AdminDetailsRequest;
import com.request.AdminRequest;
import com.service.AdminService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/adminPanel/")
public class AdminController {
	
	@Autowired
	AdminService adminService;
		
	@Autowired
	RestTemplate restTemplate;
	
	@CrossOrigin
	@PostMapping("adminSignup")
	public String adminSignup(@ModelAttribute AdminDetailsRequest adminDetailsRequest) {
	    return adminService.addAdminData(adminDetailsRequest);
	}

	@CrossOrigin
	@PostMapping("login")
	public AdminDetails adminLogin(@RequestBody AdminDetailsRequest adminLogin,HttpSession httpSession) {
		return adminService.adminLogin(adminLogin,httpSession);
	}
	
	@CrossOrigin
	@PostMapping("addAdminPaymentInfo")
	public String adminPaymentInfo(@RequestBody AdminRequest adminRequest) {
		return adminService.addAdminPaymentData(adminRequest);
	}
	
	@GetMapping("displayAdmin")
	public List<Admin> getAllAdmin(){
		return adminService.getAllAdmin();
	}
	
	@CrossOrigin
	@GetMapping("logout")
	public String adminLogout(HttpSession session) {
		session.invalidate();
		return "Logout Sucessfully...";
	}
	
	@CrossOrigin
	@PutMapping("updateAdminPaymentDetails")
	public String updateAdimPaymentDetails(@RequestBody AdminRequest updatePaymentDetails) {
		return adminService.updateAdminPaymentDetails(updatePaymentDetails);
	}
	
	@CrossOrigin
	@PutMapping("updateDetails")
	public String updateAdminPassword(@RequestBody AdminDetailsRequest updateAdminPassword) {
		return adminService.updateAdminPassword(updateAdminPassword);
	}
	
	@CrossOrigin
	@PostMapping("getAdminDetailsById")
	public Admin getAdminDetailsById(@RequestBody AdminRequest getAdminDetails){
		return adminService.getAdminPaymentDetailsById(getAdminDetails);
	}
	
	@GetMapping("displayAllHotels")
	public <T> List<T> getAllHotels(){
		List<T> listOfHotels = restTemplate.getForObject("http://localhost:8002/hotelDetails/allHotels", List.class);
		return listOfHotels;
	}
	
	@GetMapping("displayAllMenus")
	public <T> List<T> getAllMenus(){
		List<T> listOfMenus = restTemplate.getForObject("http://localhost:8002/hotelDetails/allMenus", List.class);
		return listOfMenus;
	}
	
	@GetMapping("displayAllCustomers")
	public <T> List<T> getAllCustomers(){
		List<T> listOfCustomers = restTemplate.getForObject("http://localhost:8003/customerDetails/allCustomers", List.class);
		List<T> listofCustomersFutureData = restTemplate.getForObject("http://localhost:8003/customerDetails/allCustomersFuture", List.class);
		return listOfCustomers == null ?listofCustomersFutureData:listOfCustomers;
	}
	
	@GetMapping("displayAllDeliveryPerson")
	public <T> List<T> getAllDeliveryPerson(){
		List<T> listOfDeliveryPerson = restTemplate.getForObject("http://localhost:8004/deliveryPersonDetails/getAllDeliveryPersonInfo", List.class);
		return listOfDeliveryPerson;
	}
	
	@GetMapping("displayAllPaymentsDetails")
	public <T> List<T> getAllPaymentDetailsOfCustomers(){
		List<T> listOfDeliveryPerson = restTemplate.getForObject("http://localhost:8005/customerPayment/displayAllPayments", List.class);
		return listOfDeliveryPerson;
	}
	
	@GetMapping("displayOrdrerAndPaymentDetails/{orderId}")
	public <T> List<T> getOrdersAndPaymentDetails(@PathVariable long orderId){
		List<T> listOfDeliveryPerson = restTemplate.getForObject("http://localhost:8005/paymentGateway/getOrderAndPaymentDetailsById/"+orderId, List.class);
		return listOfDeliveryPerson;
	}
	
}
