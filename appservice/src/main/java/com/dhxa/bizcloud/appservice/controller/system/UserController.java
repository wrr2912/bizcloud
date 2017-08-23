package com.dhxa.bizcloud.appservice.controller.system;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.UserClient;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.system.Dept;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    UserClient userClient;

    @Autowired
    public UserController(UserClient userClient){
        this.userClient = userClient;
    }

   
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptInfo(@RequestParam(name = "id", required = false) Long id){
    	if(id != null) {
    		logger.info("paras:id = {}", id);
            JSONObject jsonObject = userClient.findUserById(id);
            if(jsonObject.getBooleanValue("success")) {
            	List<Dept> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(Dept.class);
            	return ResponseUtil.makeSuccessResponse(rows);
            }else {
            	return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
            }
    	}else {
    		Subject subject = SecurityUtils.getSubject();		
            return ResponseUtil.makeSuccessResponse(subject.getPrincipal());
    	}
        
    }
}
