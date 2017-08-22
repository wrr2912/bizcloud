package com.dhxa.bizcloud.appservice.controller.system;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.system.DeptClient;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.system.Dept;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/dept")
public class DeptController {
    private Logger logger = LoggerFactory.getLogger(DeptController.class);

    DeptClient deptClient;

    @Autowired
    public DeptController(DeptClient deptClient){
        this.deptClient = deptClient;
    }

    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "name", required = false) String name) {
        logger.info("parameters:pageSize={},pageNumber={},name={}",pageSize,pageNumber,name);
        Subject subject = SecurityUtils.getSubject();		
        logger.info("sessionid dept=" + subject.getSession().getId());
		
        JSONObject jsonObject = deptClient.getDeptPageable(pageSize, pageNumber, name);
        if(jsonObject.getBooleanValue("success")) {
        	List<Dept> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Dept.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
        //return "abc";

    }
    
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptInfo(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        JSONObject jsonObject = deptClient.findDeptById(id);
        if(jsonObject.getBooleanValue("success")) {
        	List<Dept> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Dept.class);
        	return ResponseUtil.makeSuccessResponse(rows);
        }else {
        	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
        }
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addDept(@RequestBody Dept data) {
        try {
        	deptClient.addDept(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updateDept(@RequestBody Dept data) {
        try {
        	deptClient.updateDept(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }

    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delDept(@RequestParam Long id) {
    	try {
    		deptClient.deleteDept(id);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }

}
