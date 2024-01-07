package com.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.entity.CustomerDetails;
import com.entity.CustomerDetailsFuture;
import com.repository.CustomerDetailsFutureRepository;
import com.repository.CustomerDetailsRepository;
import com.request.CustomerDetailsRequest;


@Service
public class CustomerDetailsService{
    @Autowired
    CustomerDetailsRepository customerDetailsRepository;
    
    @Autowired
    CustomerDetailsFutureRepository customerDetailsFutureRepository;
 
   
	public List<CustomerDetails> getAllCustomers() {
		return customerDetailsRepository.findAll();
	}
    
    public List<CustomerDetailsFuture> getAllFutureCustomersList() {
		return customerDetailsFutureRepository.findAll();
	}
    
	public String createCustomer(CustomerDetailsRequest customerDetailsRequest){
		
        if(customerDetailsRequest.getArea().replaceAll("\\s+", "").toLowerCase().equals("borivaliwest") && customerDetailsRequest.getCity().toLowerCase().equals("mumbai")) {
        	if(customerDetailsRepository.searchByPhoneNo(customerDetailsRequest.getCustPhone()) == null) {
        		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            	String encrptedPassword = bcrypt.encode(customerDetailsRequest.getCustPassword());
            	try {
    				customerDetailsRequest.setCustPassword(encrptedPassword);
    			} catch (Exception e) {
    				System.out.println("Password feild must not be empty");
    			}
            	CustomerDetails customerDetails  = new CustomerDetails(customerDetailsRequest);
            	customerDetailsRepository.save(customerDetails);
    			return  "Added to database sucessfully";
        	}
        	else {
        		return "";
        	}
        }
        else {
        	if(customerDetailsFutureRepository.searchByPhoneNo(customerDetailsRequest.getCustPhone()) == null) {
        		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            	String encrptedPassword = bcrypt.encode(customerDetailsRequest.getCustPassword());
            	try {
    				customerDetailsRequest.setCustPassword(encrptedPassword);
    			} catch (Exception e) {
    				System.out.println("Password feild must not be empty");
    			}
            	CustomerDetailsFuture customerDetails  = new CustomerDetailsFuture(customerDetailsRequest);
            	customerDetailsFutureRepository.save(customerDetails) ;
            			return "We apologize for any inconvenience caused. "
    					+ "Unfortunately, our online food delivery service does not currently cover delivery to that location. "
    					+ "We are continuously expanding our delivery coverage, and we hope to serve your area in the near future. ";     
        	}
        	else {
        		return "";
        	}
		}
	}

	public CustomerDetails customerAuthentication(CustomerDetailsRequest custDetailsRequest) {
		CustomerDetails customerDetails = customerDetailsRepository.findUserByCustPhone(custDetailsRequest.getCustPhone());
		if(customerDetails!=null) {
			BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
			return bcrypt.matches(custDetailsRequest.getCustPassword(),customerDetails.getCustPassword())?customerDetails:null;
		}
		return null;
	}

	public String updateCustomerDetails(CustomerDetailsRequest customerDetailsRequest) {
			CustomerDetails customerExistingData = customerDetailsRepository.findById(customerDetailsRequest.getCustId()).orElse(null);
			if(customerDetailsRequest.getCustName()!=null && !customerDetailsRequest.getCustName().isEmpty()) {
				customerExistingData.setCustName(customerDetailsRequest.getCustName());
			}
			if(customerDetailsRequest.getCustPhone()!=null) {
				customerExistingData.setCustPhone(customerDetailsRequest.getCustPhone());
			}
			if(customerDetailsRequest.getStreet()!=null && !customerDetailsRequest.getStreet().isEmpty()) {
				customerExistingData.setStreet(customerDetailsRequest.getStreet());
			}
			if(customerDetailsRequest.getArea()!=null && !customerDetailsRequest.getArea().isEmpty()) {
				customerExistingData.setArea((String) customerDetailsRequest.getArea());
			}
			if(customerDetailsRequest.getCity()!=null && !customerDetailsRequest.getCity().isEmpty()) {
				customerExistingData.setCity(customerDetailsRequest.getCity());
			}
			else{
				customerExistingData.setPincode(customerDetailsRequest.getPincode());
			}
		return customerDetailsRepository.save(customerExistingData)!=null?"Data Enter Successfully":null;
	}

	public String updateCustomerPassword(CustomerDetailsRequest customerDetailsRequest) {
		CustomerDetails updatePassword = customerDetailsRepository.findUserByCustPhone(customerDetailsRequest.getCustPhone());
		if(customerDetailsRequest.getCustPassword()!=null && !customerDetailsRequest.getCustPassword().isEmpty()) {
			BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        	String encrptedPassword = bcrypt.encode((String)customerDetailsRequest.getCustPassword());
			updatePassword.setCustPassword(encrptedPassword);
			return customerDetailsRepository.save(updatePassword)!=null?"Data Enter Successfully":null;
		}
		return null;
	}


}
