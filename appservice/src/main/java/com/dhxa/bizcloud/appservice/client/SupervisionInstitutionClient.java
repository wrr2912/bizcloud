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
	JSONObject deleteSupervisionInstitution(@RequestParam(name = "id") Long id);
	
	@RequestMapping(method = { RequestMethod.GET }, value = "/supervisionInstitution/get")
	JSONObject findSupervisionInstitutionById(@RequestParam(name = "id") Long id);
	
	@RequestMapping(method = { RequestMethod.GET }, value = "/supervisionInstitution/getPageable")
	JSONObject getSupervisionInstitutionPageable(@RequestParam(name = "pageSize")int pageSize,
												 @RequestParam(name = "pageNumber")int pageNumber,
												 @RequestParam(name = "unitName",required = false) String unitName,
												 @RequestParam(name = "supervision",required = false) String supervision,
												 @RequestParam(name = "prefectureSupervision",required = false) String prefectureSupervision,
												 @RequestParam(name = "qualitySupervision",required = false) String qualitySupervision,
												 @RequestParam(name = "qualitySupervisionArea",required = false) String qualitySupervisionArea
												 /*supervision: null, //铁路总公司监督机构、
										            prefectureSupervision: null,  //地区政府监管部门
										            qualitySupervision: null,  //质量监督机构
										            qualitySupervisionArea: null,  //监督机构所属地域*/);
}
