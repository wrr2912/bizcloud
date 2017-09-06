package com.dhxa.bizcloud.microservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dhxa.bizcloud.microservice.entity.Department;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.DepartmentService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/department")
public class DepartmentController {
	private Logger logger = LoggerFactory.getLogger(DepartmentController.class);
	
	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getDepartmentPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
										@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
										@RequestParam(name = "departmentName", required = false) String departmentName) {
		logger.info("parameters:pageSize={},pageNumber={},departmentname={}",pageSize,pageNumber,departmentName);
		try {
            Page<Department> result = departmentService.findPageable(pageSize, pageNumber-1, departmentName);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
	}
	
	@Autowired
	private DepartmentService departmentService;
	
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getDepartment(@RequestParam Long departmentId) {
		logger.info("paras:departmentId = {}",departmentId);
		try{
            List<Department> result = new ArrayList<>();
            Department info = departmentService.findOne(departmentId);
            if(null != result){
                result.add(info);
            }
            logger.info("department-get result: = [{}],{}",departmentId,(info != null) ? info.toString(): "");
            return ResponseUtil.makeSuccessResponse(result.size(), result);
        }catch(Exception e){
        	System.out.println(e.toString());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@Transactional
	@CrossOrigin
	public Object addDepartment(@RequestParam Department data) {
		try {
			departmentService.save(data);
			return  ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"添加");
		}
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@CrossOrigin
	public Object updateDepartment(@RequestParam Department data) {
		try {
			Department dbdata = departmentService.findOne(data.getDepartementId());
			dbdata.setDepartmentName(data.getDepartmentName());
			dbdata.setSectorNumber(data.getSectorNumber());
			departmentService.save(dbdata);
			return ResponseUtil.makeSuccessResponse();
		}catch(Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"更新");
		}
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deleteDepartment(@RequestParam Long departmentId) {
		try {
			departmentService.delete(departmentId);
			return ResponseUtil.makeSuccessResponse();
		}catch(Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
		}
	}
}
