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
import com.dhxa.bizcloud.appservice.client.PersonnelClient;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.Personnel;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/personnel")
public class PersonnelController {
    private Logger logger = LoggerFactory.getLogger(PersonnelClient.class);

    PersonnelClient personnelClient;

    @Autowired
    public PersonnelController(PersonnelClient personnelClient){
        this.personnelClient = personnelClient;
    }

    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getPersonnelsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "name", required = false) String name) {
        logger.info("parameters:pageSize={},pageNumber={},name={}",pageSize,pageNumber,name);
        Subject subject = SecurityUtils.getSubject();		
        logger.info("sessionid personnel=" + subject.getSession().getId());
		
        JSONObject jsonObject = personnelClient.getPersonnelPageable(pageSize, pageNumber, name);
        System.out.println("----------------------------"+jsonObject);
        if(jsonObject.getBooleanValue("success")) {
        	List<Personnel> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Personnel.class);
        	System.out.println("到这了----------------------------"+rows);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
    }
    
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getPersonnelInfo(@RequestParam Long personnelId){
        logger.info("paras:id = {}", personnelId);
        JSONObject jsonObject = personnelClient.findPersonnelById(personnelId);
        if(jsonObject.getBooleanValue("success")) {
        	List<Personnel> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Personnel.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addPersonnel(@RequestBody Personnel data) {
        try {
        	personnelClient.addPersonnel(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updatePersonnel(@RequestBody Personnel data) {
        try {
        	personnelClient.updatePersonnel(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"修改");
        }
    }
    
    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delPersonnel(@RequestBody Long id) {
    	try {
    		personnelClient.deletePersonnel(id);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"删除");
        }
    }
}
