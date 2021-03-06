/*
 * File Name：BehaviorAnalysisOneDayController.java
 *
 * Copyrighe：copyright@2017 GZSW Company, All Rights Reserved
 *
 * Create Time: 2017年7月11日 下午2:03:05
 */
package com.gdws.vehicle.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.gdws.vehicle.config.Systemconfigs;
import com.gdws.vehicle.utils.HttpClientUtils;

/**
 *
 * @author zhangwenlong (2975830779@qq.com)
 * @version 1.0, 2017年7月11日 下午17:47
 */
@RestController
public class searchFakePlateCarController {
	@Autowired
	private Systemconfigs conf;

	@RequestMapping("searchFakePlateCar")
	public JSONObject searchFakePlateCar(String plateNo) {
		String url = "http://" + conf.getDomain() + ":" + conf.getPort();
		return JSONObject.parseObject(
				HttpClientUtils.doGet(url + "/searchFakePlateCar?plateNo=" + plateNo, null));
	}
	@RequestMapping("searchFakePlateCarALL")
	public JSONObject searchFakePlateCarALL() {
		String url = "http://" + conf.getDomain() + ":" + conf.getPort();
		return JSONObject.parseObject(
				HttpClientUtils.doGet(url + "/searchFakePlateCar?plateNo=", null));
	}
}
