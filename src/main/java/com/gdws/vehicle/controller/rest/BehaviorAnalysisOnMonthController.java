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
 * @author vous (shinena_deng@163.com)
 * @version 1.0, 2017年7月11日 下午2:03:05
 */
@RestController
public class BehaviorAnalysisOnMonthController {
	@Autowired
	private Systemconfigs conf;

	@RequestMapping("analysisOnMonth")
	public JSONObject analysisOnMonth(String plateNo) {
		String url = "http://" + conf.getDomain() + ":" + conf.getPort();
		return JSONObject.parseObject(
				HttpClientUtils.doGet(url + "/analysisOnMonth?plateNo=" + plateNo, null));
	}

    //@RequestMapping("analysisOnMonth")
    //public JSONObject analysisOnMonth(String plateNo, String crossDate) {
    //    String url = "http://" + conf.getDomain() + ":" + conf.getPort();
    //    return JSONObject.parseObject(
    //            HttpClientUtils.doGet(url + "/analysisOnMonth?plateNo=" + plateNo + "&crossDate=" +crossDate, null));
    //}
}
