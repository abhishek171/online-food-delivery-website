package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.DisplayMenu;
import com.service.DisplayMenuService;

@RestController
@RequestMapping("/displayMenu/")
public class DisplayMenuController {
	@Autowired
	DisplayMenuService displayMenuService;
	
	@GetMapping("allMenu")
	public List<DisplayMenu> getAllMenu(){
		return displayMenuService.getAllMenu();
	}
}
