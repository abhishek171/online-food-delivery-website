package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.request.AdminDetailsRequest;
import com.request.AdminRequest;

import jakarta.servlet.http.HttpSession;

import com.entity.Admin;
import com.entity.AdminDetails;
import com.repository.AdminDetailsRepository;
import com.repository.AdminRepository;

@Service
public class AdminService {
	
	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	AdminDetailsRepository adminDetailsRepository;
	
	public String addAdminData(AdminDetailsRequest adminDetailsRequest) {
		BCryptPasswordEncoder bcrptEncoder = new BCryptPasswordEncoder();
		String encrptPassword = bcrptEncoder.encode(adminDetailsRequest.getAdminPassword());
	     adminDetailsRequest.setAdminPassword(encrptPassword);
		AdminDetails addAdminData = new AdminDetails(adminDetailsRequest);
		if(adminDetailsRepository.save(addAdminData)!=null) {
			return "Admin Data saved Successfully";
		}else {
			return null;
		}
		
	}

	public AdminDetails adminLogin(AdminDetailsRequest adminLogin, HttpSession httpSession) {
		AdminDetails adminDetails = adminDetailsRepository.findAdminDetailsByUserName(adminLogin.getAdminUsername()); 
		if(adminDetails == null) {
			return null;
		}
		BCryptPasswordEncoder passwordMatcher = new BCryptPasswordEncoder();
		if(passwordMatcher.matches(adminLogin.getAdminPassword(),adminDetails.getAdminPassword())) {
			httpSession.setAttribute("Username", adminLogin.getAdminUsername());
			return adminDetails;
		}else {
			return null;
		}
	}

	public String addAdminPaymentData(AdminRequest adminRequest) {
		Admin addData = new Admin(adminRequest);
		adminRepository.save(addData);
		return "Data Inserted Successfully";
	}
	
	public String updateAdminPaymentDetails(AdminRequest updatePaymentDetails) {
		Admin adminExistingData = adminRepository.findByAdminId(updatePaymentDetails.getAdmin_id());
		if(adminExistingData == null) {
			return null;
		}
		if(adminExistingData.getAmountReceived()!=0) {
			if(updatePaymentDetails.getAmountReceived() == 0) {
				adminExistingData.setTotalBalance(adminExistingData.getTotalBalance() + (adminExistingData.getAmountReceived()*20/100));
				adminExistingData.setAmountReceived(updatePaymentDetails.getAmountReceived());
			}
			adminRepository.save(adminExistingData);
			return "Data Updated successfully";
		}
		else {
			return null;
		}
	}
	public List<Admin> getAllAdmin() {
		return adminRepository.findAll();
	}

	public Admin getAdminPaymentDetailsById(AdminRequest getAdminDetails) {
		return adminRepository.findByAdminId(getAdminDetails.getAdmin_id());
	}

	public String updateAdminPassword(AdminDetailsRequest updateAdminPassword) {
		AdminDetails updateDetails = adminRepository.findByAdminById(updateAdminPassword.getAdminId());
		if(updateDetails!=null) {
			if(!updateAdminPassword.getAdminPassword().isBlank()) {
				BCryptPasswordEncoder bcrptEncoder = new BCryptPasswordEncoder();
				String encrptPassword = bcrptEncoder.encode(updateAdminPassword.getAdminPassword());
				updateDetails.setAdminPassword(encrptPassword);
				return adminDetailsRepository.save(updateDetails)!=null ? "Password Update Successfully" : null;
			}else {
				return null;
			}
		}
		return null;
	}
}
