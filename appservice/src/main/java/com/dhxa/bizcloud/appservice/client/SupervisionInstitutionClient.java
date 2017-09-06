package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.SupervisionInstitution;

@FeignClient(name = "MICRO-SERVICE")
public interface SupervisionInstitutionClient {
	@RequestMapping(method = { RequestMethod.POST }, value = "/supervisionInstitution/add")
	JSONObject addSupervisionInstitution(@RequestBody SupervisionInstitution supervisionInstitution);
	
	@RequestMapping(method = { RequestMethod.PUT }, value = "/supervisionInstitution/update")
	JSONObject updataSupervisionInstitution(@RequestBody SupervisionInstitution supervisionInstitution);
	
	@RequestMapping(method = { RequestMethod.DELETE }, value = "/supervisionInstitution/delete")
	JSONObject deleteSupervisionInstitution(@RequestParam(name = "SIId") Long SIId);
	
	@RequestMapping(method = { RequestMethod.GET }, value = "/supervisionInstitution/get")
	JSONObject findSupervisionInstitutionById(@RequestParam(name = "SIId") Long SIId);
	
	@RequestMapping(method = { RequestMethod.GET }, value = "/supervisionInstitution/getPageable")
	JSONObject getSupervisionInstitutionPageable(@RequestParam(name = "pageSize")int pageSize,
												 @RequestParam(name = "pageNumber")int pageNumber,
												 @RequestParam(name = "unitName",required = false) String unitName);
}
