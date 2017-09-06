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
import com.dhxa.bizcloud.microservice.message.SystemMessage;
import com.dhxa.bizcloud.microservice.service.DeptService;
import com.dhxa.bizcloud.microservice.service.PersonnelService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/personnel")
public class PersonnelController {
	private Logger logger = LoggerFactory.getLogger(PersonnelController.class);
	
	@ApiOperation(value=SystemMessage.M_PERSONNEL_FIND_PAGE_BY_QUERY, notes=SystemMessage.M_PERSONNEL_FIND_PAGE_BY_QUERY)
    @ApiImplicitParams(value = {
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_SIZE, value = SystemMessage.C_PAGE_SIZE, required = true, paramType = "query", dataType = "int"),
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_NUM, value = SystemMessage.C_PAGE_NUM, required = true, paramType = "query", dataType = "int"),
	        @ApiImplicitParam(name = SystemMessage.E_PERSONNEL_NAME, value = SystemMessage.C_PERSONNEL_NAME, required = false, paramType = "query", dataType = "String")
	})
	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getpersonnelPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            						   @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
            						   @RequestParam(name = "personnelName", required = false) String personnelName) {
		logger.info("parameters:pageSize={},pageNumber={},personnelname={}",pageSize,pageNumber,personnelName);
        try {
            Page<Personnel> result = personnelService.findPageable(pageSize, pageNumber-1, personnelName);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
	}
	
	@Autowired
	private PersonnelService personnelService;
	 @ApiOperation(value=SystemMessage.M_PERSONNEL_FIND_BY_ID, notes=SystemMessage.M_PERSONNEL_FIND_BY_ID)
	    @ApiImplicitParams(value= {
	    		@ApiImplicitParam(name = SystemMessage.E_PERSONNEL_ID, value=SystemMessage.C_PERSONNEL_ID, required = true, paramType="query", dataType="Long")
	    })
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getPersonnel(@RequestParam Long id) {
		logger.info("paras:id = {}",id);
		 try{
	            List<Personnel> result = new ArrayList<>();
	            Personnel info = personnelService.findOne(id);
	            if(null != result){
	                result.add(info);
	            }
	            logger.info("personnel-get result: = [{}],{}",id,(info != null) ? info.toString(): "");
	            return ResponseUtil.makeSuccessResponse(result.size(), result);
	        }catch(Exception e){
	        	System.out.println(e.toString());
	            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
	        }
	}
	
	@ApiOperation(value = SystemMessage.M_PERSONNEL_CREATE, notes = SystemMessage.M_PERSONNEL_CREATE)
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
	
	@ApiOperation(value = SystemMessage.M_PERSONNEL_UPDATE, notes = SystemMessage.M_PERSONNEL_UPDATE)
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
	
	@ApiOperation(value=SystemMessage.M_PERSONNEL_DELETE, notes=SystemMessage.M_PERSONNEL_DELETE)
	@ApiImplicitParams(value= {
	@ApiImplicitParam(name = SystemMessage.E_PERSONNEL_ID, value=SystemMessage.C_PERSONNEL_ID, required = true, paramType="query", dataType="Long")
	    })
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deletePersonnel(@RequestParam Long id) {
		try {
			personnelService.delete(id);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
		}
	}
}
