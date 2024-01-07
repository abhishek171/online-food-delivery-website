package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.entity.DeliveryPersonDetails;
import com.repository.DeliveryPersonDetailsRepository;
import com.request.DeliveryPersonDetailsRequest;

import jakarta.servlet.http.HttpSession;

@Service
public class DeliveryPersonDetailsService {

	@Autowired
	DeliveryPersonDetailsRepository deliveryPersonDetailsRepository;
	public String deliveryPersonSignup(DeliveryPersonDetailsRequest deliveryPersonDetailsRequest) {
		DeliveryPersonDetails deliveryPerson = deliveryPersonDetailsRepository.findByDeliveryPersonId(deliveryPersonDetailsRequest.getUserId());
		if(deliveryPerson == null) {
			BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = bcryptPasswordEncoder.encode(deliveryPersonDetailsRequest.getPassword());
			deliveryPersonDetailsRequest.setPassword(encodedPassword);
			DeliveryPersonDetails addDeliveryPerson =  new DeliveryPersonDetails(deliveryPersonDetailsRequest);
			return deliveryPersonDetailsRepository.save(addDeliveryPerson) + "Added to Database";
		}else {
			return "User Already Exist";
		}
	}
	
	public DeliveryPersonDetails deliveryPersonLogin(DeliveryPersonDetailsRequest checkLogin, HttpSession httpSession) {
		DeliveryPersonDetails findDeliveryPerson = deliveryPersonDetailsRepository.findDeliveryPersonById(checkLogin.getUserId());
		if(findDeliveryPerson != null) {
			httpSession.setAttribute("user", findDeliveryPerson.getName());
			BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
			return bcryptPasswordEncoder.matches(checkLogin.getPassword(),findDeliveryPerson.getPassword())?findDeliveryPerson:null;    
		}else {
			return null;
		}
	}

	public String updateDeliveryPersonInfo(DeliveryPersonDetailsRequest updateDetails) {
		DeliveryPersonDetails findDeliveryPerson = deliveryPersonDetailsRepository.findDeliveryPersonById(updateDetails.getUserId());
		if(findDeliveryPerson == null) {
			return null;
		}else {
			if(updateDetails.getName()!=null && !updateDetails.getName().isEmpty()) {
				findDeliveryPerson.setName(updateDetails.getName());
			}
			if(updateDetails.getContactNo()!=0) {
				findDeliveryPerson.setContactNo(updateDetails.getContactNo());
			}
			
			deliveryPersonDetailsRepository.save(findDeliveryPerson);
			return  "Data Updated";
		}
	}

	public List<DeliveryPersonDetails> getAllDeliveryPersonInfo() {
		return deliveryPersonDetailsRepository.findAll();
	}

	public Optional<DeliveryPersonDetails> getDeliveryPersonInfoById(long id) {
		return deliveryPersonDetailsRepository.findById(id);
	}

	public String updateDeliveryPersonPassword(DeliveryPersonDetailsRequest updateDetails) {
		DeliveryPersonDetails findDeliveryPerson = deliveryPersonDetailsRepository.findDeliveryPersonByPhone(updateDetails.getContactNo());
		if(findDeliveryPerson != null) {
			if(updateDetails.getPassword()!=null && !updateDetails.getPassword().isEmpty()) {
				BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
				String encodedPassword = bcryptPasswordEncoder.encode(updateDetails.getPassword());
				findDeliveryPerson.setPassword(encodedPassword);
				deliveryPersonDetailsRepository.save(findDeliveryPerson);
				return "Password Updated";
			}else {
				return null;
			}
		}
		return null;
	}

}
