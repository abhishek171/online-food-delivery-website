   package com.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.entity.HotelAddress;
import com.entity.HotelDetail;
import com.entity.HotelDetailsFuture;
import com.repository.HotelAddressRepository;
import com.repository.HotelDetailFutureRepository;
import com.repository.HoteldetailRepository;
import com.request.HotelDetailRequest;

import jakarta.servlet.http.HttpSession;

@Service
public class HotelDetailService {
	@Autowired
	HoteldetailRepository hoteldetailRepository;
	
	@Autowired
	HotelAddressRepository hotelAddressRepository;
	
	@Autowired
	HotelDetailFutureRepository hotelDetailFutureRepository;

	public String addHotelDetail(HotelDetailRequest hotelDetailRequest) {
		
		if(hotelDetailRequest.getArea().replaceAll("\\s+", "").toLowerCase().equals("borivaliwest") && hotelDetailRequest.getCity().toLowerCase().equals("mumbai")) {
			if(hoteldetailRepository.findByUserId(hotelDetailRequest.getUser_id()) == null) {
				BCryptPasswordEncoder bcrpytPasswordEncoder = new BCryptPasswordEncoder();
				String encrptedPassword = bcrpytPasswordEncoder.encode(hotelDetailRequest.getPassword());
				
				hotelDetailRequest.setPassword(encrptedPassword);
				HotelDetail hotelDetail = new HotelDetail(hotelDetailRequest);
				
				HotelAddress hotelAddress = new HotelAddress();
				
				hotelAddress.setArea(hotelDetailRequest.getArea());
				hotelAddress.setStreet(hotelDetailRequest.getStreet());
				hotelAddress.setCity(hotelDetailRequest.getCity());
				hotelAddress.setPincode(hotelDetailRequest.getPincode());
				
				hotelAddressRepository.save(hotelAddress);
				
				hotelDetail.setHotelAddress(hotelAddress);
				
				hotelDetail = hoteldetailRepository.save(hotelDetail);
				
				return "Data Entered Sucessfully";
			}else {
				return null;
			}
		}else {
			if(hotelDetailFutureRepository.findByUserId(hotelDetailRequest.getUser_id()) == null) {
				BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
				String encrptedPassword = bcrypt.encode(hotelDetailRequest.getPassword());
				
				hotelDetailRequest.setPassword(encrptedPassword);
				
				HotelDetailsFuture hotelDetailsFuture = new HotelDetailsFuture(hotelDetailRequest);
				return hotelDetailFutureRepository.save(hotelDetailsFuture) + "Currently service is not available at Your Location";
			}else {
				return null;
			}
		}
	}

	public HotelDetail hotelLogin(HotelDetailRequest hotelDetailRequest,HttpSession httpSession) {
		
		HotelDetail hotelDetail =  hoteldetailRepository.findByUserId(hotelDetailRequest.getUser_id());
		if(hotelDetail !=null) {
			BCryptPasswordEncoder bcrpytPasswordEncoder = new BCryptPasswordEncoder();
			httpSession.setAttribute("userId", hotelDetailRequest.getUser_id());
			return bcrpytPasswordEncoder.matches(hotelDetailRequest.getPassword(),hotelDetail.getPassword())? hotelDetail : null;
		}
		return null;
	}

	public List<HotelDetail> getAllCurrentHotel() {
		
		return hoteldetailRepository.findAll();
	}

	public List<HotelDetailsFuture> getAllFutureHotel() {
		return hotelDetailFutureRepository.findAll();
	}

	public HotelDetail updateHotelDetails(HotelDetailRequest updateHotelDetails) {
	    HotelDetail existingData = hoteldetailRepository.findById(updateHotelDetails.getId()).orElse(null);
	    HotelAddress existingAddressData = hotelAddressRepository.findById(updateHotelDetails.getId()).orElse(null);
	    
	    if (existingData == null || existingAddressData == null) {
	        return null;
	    }
	    else {
		    if (updateHotelDetails.getHotel_name() != null && !updateHotelDetails.getHotel_name().isEmpty()) {
		        existingData.setHotel_name(updateHotelDetails.getHotel_name());
		    }
		    if (updateHotelDetails.getUser_id() != null && !updateHotelDetails.getUser_id().isEmpty()) {
		        existingData.setUser_id(updateHotelDetails.getUser_id());
		    }
		    if(updateHotelDetails.getPassword()!=null && !updateHotelDetails.getPassword().isEmpty()) {
		    	BCryptPasswordEncoder bcrpytPasswordEncoder = new BCryptPasswordEncoder();
				String encrptedPassword = bcrpytPasswordEncoder.encode(updateHotelDetails.getPassword());
				existingData.setPassword(encrptedPassword);
		    }
		    if (updateHotelDetails.getTotal_balance() != 0) {
		        existingData.setTotal_balance(existingData.getTotal_balance() + updateHotelDetails.getTotal_balance());
		    }
		    if (updateHotelDetails.getStreet() != null && !updateHotelDetails.getStreet().isEmpty()) {
		        existingAddressData.setStreet(updateHotelDetails.getStreet());
		    }
		    if (updateHotelDetails.getArea() != null && !updateHotelDetails.getArea().isEmpty()) {
		        existingAddressData.setArea(updateHotelDetails.getArea());
		    }
		    if (updateHotelDetails.getCity() != null && !updateHotelDetails.getCity().isEmpty()) {
		        existingAddressData.setCity(updateHotelDetails.getCity());
		    }
		    if (updateHotelDetails.getPincode() != 0) {
		        existingAddressData.setPincode(updateHotelDetails.getPincode());
		    }
	
		    if (existingAddressData.getArea().replaceAll("\\s+", "").toLowerCase().equals("borivaliwest") && existingAddressData.getCity().toLowerCase().equals("mumbai")) {
		        hotelAddressRepository.save(existingAddressData);
		        existingData.setHotelAddress(existingAddressData);
		        hoteldetailRepository.save(existingData);
		        return existingData;
		    } else {
		        HotelDetailsFuture newHotelDetail = new HotelDetailsFuture();
		        newHotelDetail.setHotel_name(existingData.getHotel_name());
		        newHotelDetail.setUser_id(existingData.getUser_id());
		        newHotelDetail.setPassword(existingData.getPassword());
		        newHotelDetail.setStreet(existingAddressData.getStreet());
		        newHotelDetail.setArea(existingAddressData.getArea());
		        newHotelDetail.setCity(existingAddressData.getCity());
		        newHotelDetail.setPincode(existingAddressData.getPincode());
		        hoteldetailRepository.deleteById(updateHotelDetails.getId());
		        hotelAddressRepository.deleteById(updateHotelDetails.getId());
		        hotelDetailFutureRepository.save(newHotelDetail);
		        return null;
		    }
	    }
	}

	public Integer getIdByHotelName(HotelDetailRequest hotelName) {
		return hoteldetailRepository.getIdByHotelName(hotelName.getHotel_name());
	}


	

}
