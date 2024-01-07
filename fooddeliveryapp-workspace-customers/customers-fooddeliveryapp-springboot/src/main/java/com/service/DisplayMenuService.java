package com.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.DisplayMenu;
import com.repository.DisplayMenuRepository;

@Service
public class DisplayMenuService {
	
	@Autowired
	DisplayMenuRepository displayMenuRepository;

	public List<DisplayMenu> getAllMenu() {
		return displayMenuRepository.findAll();
	}

}
