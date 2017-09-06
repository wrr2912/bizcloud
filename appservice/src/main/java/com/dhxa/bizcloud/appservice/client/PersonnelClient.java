package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.Personnel;

@FeignClient(name = "MICRO-SERVICE")
public interface PersonnelClient {
	@RequestMapping(method = { RequestMethod.POST }, value = "/personnel/add")
	JSONObject addPersonnel(@RequestBody Personnel personnel);
	
	@RequestMapping(method = { RequestMethod.PUT }, value = "/personnel/update")
    JSONObject updatePersonnel(@RequestBody Personnel personnel);

    @RequestMapping(method = { RequestMethod.DELETE }, value = "/personnel/delete")
    JSONObject deletePersonnel(@RequestParam(name = "personnelId") Long personnelId);

    @RequestMapping(method = { RequestMethod.GET }, value = "/personnel/get")
    JSONObject findPersonnelById(@RequestParam(name = "personnelId") Long personnelId);

    @RequestMapping(method = { RequestMethod.GET }, value = "/personnel/getPageable")
    JSONObject getPersonnelPageable(@RequestParam(name = "pageSize") int pageSize,
    								@RequestParam(name = "pageNumber") int pageNumber,
                                    @RequestParam(name = "personnelName", required = false) String personnelName);
    
    
    
}
