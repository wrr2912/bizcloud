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

import com.dhxa.bizcloud.microservice.entity.Dept;
import com.dhxa.bizcloud.microservice.entity.SupervisionInstitution;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.SupervisionInstitutionService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/supervisionInstitution")
public class SupervisionInstitutionController {
	private Logger logger = LoggerFactory.getLogger(SupervisionInstitutionController.class);
	
	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "unitName", required = false) String unitName) {
        logger.info("parameters:pageSize={},pageNumber={},unitName={}",pageSize,pageNumber,unitName);
        try {
            Page<SupervisionInstitution> result = supervisionInstitutionService.findPageable(pageSize,pageNumber-1,unitName);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
    }
	@Autowired
	private SupervisionInstitutionService supervisionInstitutionService;
	
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getSupervisionInstitution(@RequestParam Long SIId) {
		logger.info("paras:id = {}",SIId);
		 try{
	            List<SupervisionInstitution> result = new ArrayList<>();
	            SupervisionInstitution info = supervisionInstitutionService.findOne(SIId);
	            if(null != result){
	                result.add(info);
	            }
	            logger.info("supervisionInstitution-get result: = [{}],{}",SIId,(info != null) ? info.toString(): "");
	            return ResponseUtil.makeSuccessResponse(result.size(), result);
	        }catch(Exception e){
	        	System.out.println(e.toString());
	            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
	        }
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@Transactional
	@CrossOrigin
	public Object addSupervisionInstitution(@RequestBody SupervisionInstitution data) {
		try {
			supervisionInstitutionService.save(data);
			return  ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
		}	
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@CrossOrigin
	public Object updateSupervisionInstitution(@RequestBody SupervisionInstitution data) {
		
		try {
			SupervisionInstitution dbdata = supervisionInstitutionService.findOne(data.getSIId());
			dbdata.setUnitName(data.getUnitName());
			dbdata.setUnitAbbreviation(data.getUnitAbbreviation());
			dbdata.setLegalRepresentative(data.getLegalRepresentative());
			dbdata.setLegalPersonCode(data.getLegalPersonCode());
			dbdata.setPostalAddress(data.getPostalAddress());
			dbdata.setPostalCode(data.getPostalCode());
			dbdata.setOfficialWebsiteLink(data.getOfficialWebsiteLink());
			dbdata.setRemarks(data.getRemarks());
			dbdata.setTelephoneWatch(data.getTelephoneWatch());
			dbdata.setEntryName(data.getEntryName());
			dbdata.setProjectNumber(data.getProjectNumber());
			dbdata.setProjectContact(data.getProjectContact());
			dbdata.setContactPhone(data.getContactPhone());
			dbdata.setEntryMan(data.getEntryMan());
			dbdata.setEntryDate(data.getEntryDate());
			supervisionInstitutionService.save(dbdata);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			 throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"更新");
		}
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deleteSupervisionInstitution(@RequestParam Long SIId) {
		try {
			supervisionInstitutionService.delete(SIId);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
		}
	}
}
