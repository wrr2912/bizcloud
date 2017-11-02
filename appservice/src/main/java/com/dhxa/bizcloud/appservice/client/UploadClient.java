package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;

@FeignClient(name = "MICRO-SERVICE-RR")
public interface UploadClient {
	@RequestMapping(method = { RequestMethod.POST }, value = "/file/upload")
	JSONObject fileUpload(@RequestParam(name = "fileName") String fileName, @RequestParam(name = "filePath") String filePath);
	
	@RequestMapping(value = "/file/get", method = { RequestMethod.GET })
	JSONObject getFile(@RequestParam(name = "id") Long id);
	
	@RequestMapping(value = "/file/delete", method = {RequestMethod.DELETE} )
	public Object deleteFile(@RequestParam(name = "id") Long id);
}
