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
import com.dhxa.bizcloud.appservice.client.SupervisionInstitutionClient;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.SupervisionInstitution;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/supervisionInstitution")
public class SupervisionInstitutionController {
	private Logger logger = LoggerFactory.getLogger(SupervisionInstitutionController.class);
	
	SupervisionInstitutionClient supervisionInstitutionClient;
	@Autowired
	public SupervisionInstitutionController(SupervisionInstitutionClient supervisionInstitutionClient) {
		this.supervisionInstitutionClient = supervisionInstitutionClient;
	}
	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getSupervisionInstitutionPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
												   @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
												   @RequestParam(name = "unitName", required = false)String unitName,
												   @RequestParam(name = "supervision", required = false)String supervision,
												   @RequestParam(name = "prefectureSupervision", required = false)String prefectureSupervision,
												   @RequestParam(name = "qualitySupervision", required = false)String qualitySupervision,
												   @RequestParam(name = "qualitySupervisionArea", required = false)String qualitySupervisionArea) {
		 logger.info("parameters:pageSize={},pageNumber={},unitName={}",pageSize,pageNumber,unitName);
		 Subject subject = SecurityUtils.getSubject();
		 logger.info("sessionid supervisionInstitution=" + subject.getSession().getId());
		 JSONObject jsonObject = supervisionInstitutionClient.getSupervisionInstitutionPageable(pageSize, pageNumber, unitName,supervision,prefectureSupervision,qualitySupervision,qualitySupervisionArea);
		 /*supervision: null, //铁路总公司监督机构、
         prefectureSupervision: null,  //地区政府监管部门
         qualitySupervision: null,  //质量监督机构
         qualitySupervisionArea: null,  //监督机构所属地域*/
		 if(jsonObject.getBooleanValue("success")) {
			 List<SupervisionInstitution> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(SupervisionInstitution .class);
			 return ResponseUtil.makeSuccessResponse(rows);
		 }else {
			 return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
		 }
	}
	
	@RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getSupervisionInstitutionInfo(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        JSONObject jsonObject = supervisionInstitutionClient.findSupervisionInstitutionById(id);
        if(jsonObject.getBooleanValue("success")) {
        	List<SupervisionInstitution> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(SupervisionInstitution.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
    }
	
	 @RequestMapping(value = "add", method = RequestMethod.POST)
	 @Transactional
	 @CrossOrigin
	 public Object addSupervisionInstitution(@RequestBody SupervisionInstitution data) {
	     try {
	    	 supervisionInstitutionClient.addSupervisionInstitution(data);
	         return  ResponseUtil.makeSuccessResponse();
	     } catch (Exception e) {
	         throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
	     }
	 }
	 @RequestMapping(value = "update", method = RequestMethod.PUT)
	 @CrossOrigin
	 public Object updateSupervisionInstitution(@RequestBody SupervisionInstitution data) {
	     try {
	      	supervisionInstitutionClient.updataSupervisionInstitution(data);
	         return  ResponseUtil.makeSuccessResponse();
	     } catch (Exception e) {
	         throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"修改");
	     }
	 }
	 @RequestMapping(value = "delete", method = RequestMethod.DELETE)
	 @CrossOrigin
	 public Object delSupervisionInstitution(@RequestParam Long id) {
	 	try {
	         supervisionInstitutionClient.deleteSupervisionInstitution(id);
	         return  ResponseUtil.makeSuccessResponse();
	   } catch (Exception e) {
	      throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"删除");
	     }
    }
}
