package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.Department;

@FeignClient(name = "MICRO-SERVICE")
public interface DepartmentClient {
	@RequestMapping(method = { RequestMethod.POST }, value = "/department/add")
	JSONObject addDepartment(@RequestBody Department department);
	@RequestMapping(method = { RequestMethod.PUT }, value = "/department/update")
	JSONObject updateDepartment(@RequestBody Department department);
	@RequestMapping(method = { RequestMethod.DELETE }, value = "/department/delete")
	JSONObject deleteDepartment(@RequestParam(name = "departmentId") Long departmentId);
	@RequestMapping(method = { RequestMethod.GET }, value = "/department/get")
	JSONObject findDepartmentById(@RequestParam(name = "departmentId") Long departmentId);
	@RequestMapping(method = { RequestMethod.GET }, value = "/department/getPageable")
	JSONObject getDepartmentPageable(@RequestParam(name = "pageSize") int pageSize,
									 @RequestParam(name = "pageNumber") int pageNumber,
									 @RequestParam(name = "departmentName",required = false) String departmentName);
}
