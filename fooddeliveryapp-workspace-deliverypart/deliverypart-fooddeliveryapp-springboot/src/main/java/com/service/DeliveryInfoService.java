package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.DeliveryInfo;
import com.repository.DeliveryInfoRepository;

@Service
public class DeliveryInfoService {
	@Autowired
	DeliveryInfoRepository deliveryInfoRepository;
	public String updateDeliveryInfo(DeliveryInfo deliveyInfo) {
		DeliveryInfo updateStatus = deliveryInfoRepository.findDeliveryInfoById(deliveyInfo.getDeliveryPersonId());
		if(updateStatus!=null) {
			updateStatus.setDeliveryStatus("Delivered");
			deliveryInfoRepository.save(updateStatus);
			return "Status Updated Successfully";
		}else {
			return null;
		}
	}
	public List<DeliveryInfo> getUndeliveredOrderInfo(long deliveryPersonId) {
		return deliveryInfoRepository.getUndeliveredOrderInfo(deliveryPersonId);
	}

}
