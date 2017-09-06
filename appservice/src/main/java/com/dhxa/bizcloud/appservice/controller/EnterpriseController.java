package com.dhxa.bizcloud.appservice.controller;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.EnterpriseClient;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.Enterprise;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/enterprise")
public class EnterpriseController {
    private Logger logger = LoggerFactory.getLogger(EnterpriseController.class);

    EnterpriseClient enterpriseClient;

    @Autowired
    public EnterpriseController(EnterpriseClient enterpriseClient){
        this.enterpriseClient = enterpriseClient;
    }

    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getEnterprisesPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "enterpriseName", required = false) String enterpriseName) {
        logger.info("parameters:pageSize={},pageNumber={},enterpriseName={}",pageSize,pageNumber,enterpriseName);
        Subject subject = SecurityUtils.getSubject();		
        logger.info("sessionid enterprise=" + subject.getSession().getId());
		
        JSONObject jsonObject = enterpriseClient.getEnterprisePageable(pageSize, pageNumber, enterpriseName);
        if(jsonObject.getBooleanValue("success")) {
        	List<Enterprise> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Enterprise.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
        //return "abc";

    }
    
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getEnterpriseInfo(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        JSONObject jsonObject = enterpriseClient.findEnterpriseById(id);
        if(jsonObject.getBooleanValue("success")) {
        	List<Enterprise> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Enterprise.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addEnterprise(@RequestBody JSONObject data) {
        try {
        	Enterprise entity = new Enterprise(data);
        	enterpriseClient.addEnterprise(entity);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updateEnterprise(@RequestBody JSONObject data) {
        try {
        	Enterprise entity = new Enterprise(data);
        	enterpriseClient.updateEnterprise(entity);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"修改");
        }
    }

    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delEnterprise(@RequestParam Long id) {
    	try {
    		enterpriseClient.deleteEnterprise(id);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"删除");
        }
    }

}
