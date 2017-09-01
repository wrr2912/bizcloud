package com.dhxa.bizcloud.microservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dhxa.bizcloud.microservice.entity.Personnel;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.DeptService;
import com.dhxa.bizcloud.microservice.service.PersonnelService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/personnel")
public class PersonnelController {
	private Logger logger = LoggerFactory.getLogger(PersonnelController.class);
	
	
	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getpersonnelPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            						   @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
            						   @RequestParam(name = "name", required = false) String name) {
		logger.info("parameters:pageSize={},pageNumber={},name={}",pageSize,pageNumber,name);
        try {
            Page<Personnel> result = personnelService.findPageable(pageSize, pageNumber-1, name);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
	}
	
	@Autowired
	private PersonnelService personnelService;
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getPersonnel(@RequestParam Long personnelId) {
		logger.info("paras:id = {}",personnelId);
		 try{
	            List<Personnel> result = new ArrayList<>();
	            Personnel info = personnelService.findOne(personnelId);
	            if(null != result){
	                result.add(info);
	            }
	            logger.info("personnel-get result: = [{}],{}",personnelId,(info != null) ? info.toString(): "");
	            return ResponseUtil.makeSuccessResponse(result.size(), result);
	        }catch(Exception e){
	        	System.out.println(e.toString());
	            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
	        }
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@Transactional
	@CrossOrigin
	public Object addPersonnel(@RequestBody Personnel data) {
		try {
			personnelService.save(data);
			return  ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
		}	
	}
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@CrossOrigin
	public Object updatePersonnel(@RequestBody Personnel data) {
		
		try {
			Personnel dbdata = personnelService.findOne(data.getpersonnelId());
			dbdata.setpersonnelName(data.getpersonnelName());
			dbdata.setpersonnelGender(data.getpersonnelGender());
			dbdata.setpersonnelAge(data.getpersonnelAge());
			personnelService.save(dbdata);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			 throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"更新");
		}
	}
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deletePersonnel(@RequestBody Long personnelId) {
		try {
			personnelService.delete(personnelId);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
		}
	}
}
