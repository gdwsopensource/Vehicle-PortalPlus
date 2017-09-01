package com.gdws.vehicle.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.gdws.vehicle.utils.HttpClientUtils;

@RestController
public class TestController {
	private static Logger log = LoggerFactory.getLogger(TestController.class);
	// 获取access_token的接口地址（GET） 限200（次/天）
	public final static String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
	public static String appid = "wxc60cdd583ac9b2bd";
	public static String appsecret = "30c55b5042ae9a6d43cfc14b874aa6d1";
	// 用户群发文本接口
	public static String post_test_all_url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN";

	// 第三方用户唯一凭证
	public static Object accessToken = null;

	@GetMapping(value = "/getAccessToken")
	public JSONObject GetAccessToken() {
		String requestUrl = access_token_url.replace("APPID", appid).replace("APPSECRET", appsecret);
		return gettoken(requestUrl);
	}
	
	
	

	// 用户群发
	@PostMapping(value = "/postTestAll")
	public JSONObject PostTestAll(@RequestParam(value = "content", required = true) String content) {
		JSONObject obj = new JSONObject();
		//obj.put("content", request.getParameter("content"));
//		String str="{'test':'shuifeng'}";
			/*{
			   "filter":{
			      "is_to_all":true,
			   },
			   "text":{
			      "content":content
			   },
			    "msgtype":"text"
			}*/
		
		//System.out.println(request.getParameter("content"));
		//return obj;
		obj.put("filter", "{'is_to_all:true'}");
		obj.put("text", "{'content:'+content+'}");
		
		String body="{\\\"filter\\\":{\\\"is_to_all\\\":true},\\\"text\\\":{\\\"content\\\":\\\""+content+"\\\"},\\\"msgtype\\\":\\\"text\\\"}";
		
		 String access_token = (String) GetAccessToken().get("access_token");
		 String requestUrl = post_test_all_url.replace("ACCESS_TOKEN", access_token);
		 System.out.println(body);
		 return JSONObject.parseObject(HttpClientUtils.doPost(requestUrl, body));
	}

	@Scheduled(fixedDelay = 7200000)
	// 7200秒执行一次
	public JSONObject gettoken(String url) {
		accessToken = JSONObject.parseObject(HttpClientUtils.doGet(url, null));
		if (null != accessToken) {
			log.info("获取成功，accessToken:" + accessToken);
		} else {
			log.error("获取token失败");
		}
		return (JSONObject) accessToken;
	}
}
