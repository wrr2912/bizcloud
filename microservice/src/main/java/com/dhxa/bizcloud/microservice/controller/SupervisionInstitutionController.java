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
                                       @RequestParam(name = "unitName", required = false) String unitName,
                                       @RequestParam(name = "supervision", required = false) String supervision,
                                       @RequestParam(name = "prefectureSupervision", required = false) String prefectureSupervision,
                                       @RequestParam(name = "qualitySupervision", required = false) String qualitySupervision,
                                       @RequestParam(name = "qualitySupervisionArea", required = false) String qualitySupervisionArea) {
        logger.info("parameters:pageSize={},pageNumber={},unitName={}",pageSize,pageNumber,unitName);
        try {
        	/*supervision: null, //铁路总公司监督机构、
            prefectureSupervision: null,  //地区政府监管部门
            qualitySupervision: null,  //质量监督机构
            qualitySupervisionArea: null,  //监督机构所属地域*/
            Page<SupervisionInstitution> result = supervisionInstitutionService.findPageable(pageSize,pageNumber-1,unitName,supervision,prefectureSupervision,qualitySupervision,qualitySupervisionArea);
            System.out.println( result.getContent());
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
	public Object getSupervisionInstitution(@RequestParam Long id) {
		logger.info("paras:id = {}",id);
		 try{
	            List<SupervisionInstitution> result = new ArrayList<>();
	            SupervisionInstitution info = supervisionInstitutionService.findOne(id);
	            if(null != result){
	                result.add(info);
	            }
	            logger.info("supervisionInstitution-get result: = [{}],{}",id,(info != null) ? info.toString(): "");
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
			SupervisionInstitution dbdata = supervisionInstitutionService.findOne(data.getId());
			dbdata.setSupervision(data.getSupervision());
			dbdata.setPrefectureSupervision(data.getPrefectureSupervision());
			dbdata.setQualitySupervision(data.getQualitySupervision());
			dbdata.setQualitySupervisionArea(data.getQualitySupervisionArea());
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
	public Object deleteSupervisionInstitution(@RequestParam Long id) {
		try {
			supervisionInstitutionService.delete(id);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
		}
	}
	@RequestMapping(value = "sort")
	@CrossOrigin
	public Object sortSupervisionInstitution() {
		try {
			
		} catch (Exception e) {
			
		}
		return logger;
	}
}
