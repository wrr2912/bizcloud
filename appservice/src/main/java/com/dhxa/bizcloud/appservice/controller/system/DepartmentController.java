package com.dhxa.bizcloud.appservice.controller.system;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.DepartmentClient;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.Department;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/department")
public class DepartmentController {
	 private Logger logger = LoggerFactory.getLogger(DepartmentController.class);
	 
	 DepartmentClient departmentClient;
	 
	 @Autowired
	 public DepartmentController(DepartmentClient departmentClient) {
		 this.departmentClient=departmentClient;
	 }
	 
	 @RequestMapping(value = "getPageable", method = RequestMethod.GET)
	 @CrossOrigin
	 public Object getDepartmentPageable(@RequestParam(name = "pageSize", defaultValue="10")int pageSize,
			 							 @RequestParam(name = "pageNumber", defaultValue = "1")int pageNumber,
			 							 @RequestParam(name = "departmentName", required = false)String departmentName) {
	     logger.info("parameters:pageSize={},pageNumber={},departmentName={}",pageSize,pageNumber,departmentName);
		 Subject subject = SecurityUtils.getSubject();
		 logger.info("sessionid epartment=" + subject.getSession().getId());
		 JSONObject jsonObject = departmentClient.getDepartmentPageable(pageSize, pageNumber, departmentName);
		 
		 if(jsonObject.getBooleanValue("success")) {
	        	List<Department> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Department.class);
	        	return ResponseUtil.makeSuccessResponse(rows);
	        }else {
	        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
	        }
	 }
	 
	 @RequestMapping(value = "get" , method = RequestMethod.GET)
	 @CrossOrigin
	 public Object getDepartmentInfo(@RequestParam Long departmentId){
		 logger.info("paras:departmentId = {}", departmentId);
	        JSONObject jsonObject = departmentClient.findDepartmentById(departmentId);
	        if(jsonObject.getBooleanValue("success")) {
	        	List<Department> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Department.class);
	        	return ResponseUtil.makeSuccessResponse(rows);
	        }else {
	        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
	        }
	 }
	 
	 @RequestMapping(value = "add", method = RequestMethod.POST)
	 @Transactional
	 @CrossOrigin
	 public Object addDepartment(@RequestBody Department data) {
	     try {
	    	 departmentClient.addDepartment(data);
	         return  ResponseUtil.makeSuccessResponse();
	     } catch (Exception e) {
	         throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
	     }
	 }
	 @RequestMapping(value = "update", method = RequestMethod.PUT)
	 @CrossOrigin
	 public Object updateDepartment(@RequestBody Department data) {
	     try {
	    	 departmentClient.updateDepartment(data);
	         return  ResponseUtil.makeSuccessResponse();
	     } catch (Exception e) {
	         throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"修改");
	     }
	 }
	    
	 @RequestMapping(value = "delete", method = RequestMethod.DELETE)
	 @CrossOrigin
	 public Object delDepartment(@RequestParam Long DepartmentId) {
	 	try {
	 		departmentClient.deleteDepartment(DepartmentId);
	         return  ResponseUtil.makeSuccessResponse();
	     } catch (Exception e) {
	         throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"删除");
	     }
	 }
}
