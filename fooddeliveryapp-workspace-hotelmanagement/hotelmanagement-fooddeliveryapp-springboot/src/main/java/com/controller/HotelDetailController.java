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

import com.entity.HotelDetail;
import com.entity.HotelDetailsFuture;
import com.request.HotelDetailRequest;
import com.service.HotelDetailService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/hotelDetail/")
public class HotelDetailController {
	@Autowired
	HotelDetailService hotelDetailService;
	
	@CrossOrigin
	@PostMapping("signup")
	public String addHotelDetail(@ModelAttribute HotelDetailRequest hotelDetailRequest){
		hotelDetailRequest.setTotal_balance(0);
		return hotelDetailService.addHotelDetail(hotelDetailRequest);
	}

	@CrossOrigin
	@PostMapping("login")
	public HotelDetail hotelLogin(@RequestBody HotelDetailRequest hotelDetailRequest,HttpSession httpSession) {
		return hotelDetailService.hotelLogin(hotelDetailRequest,httpSession);
	}
	
	@GetMapping("logout")
	public String hotelSignout(HttpSession httpSession) {
			httpSession.invalidate();
		return "Logout SuccessFully";
	}
	
	@CrossOrigin
	@PutMapping("updateHotelDetails")
	public HotelDetail updateHotelDetails(@RequestBody HotelDetailRequest updateHotelDetails) {
		return hotelDetailService.updateHotelDetails(updateHotelDetails);
	}
	
	@CrossOrigin
	@PostMapping("getId")
	public Integer getIdByHotelName(@RequestBody HotelDetailRequest hotelName) {
		return hotelDetailService.getIdByHotelName(hotelName);
	}
	
	@GetMapping("allhotels")
	public List<HotelDetail> getAllCurrentHotel(){
		return hotelDetailService.getAllCurrentHotel();
	}
	
	@GetMapping("allHotelFuture")
	public List<HotelDetailsFuture> getAllFutureHotel(){
		return hotelDetailService.getAllFutureHotel();
	}
}
