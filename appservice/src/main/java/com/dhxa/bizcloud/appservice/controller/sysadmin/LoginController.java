package com.dhxa.bizcloud.appservice.controller.sysadmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.UserClient;
import com.dhxa.bizcloud.appservice.common.controller.Response;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.User;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@Controller
@EnableAutoConfiguration
public class LoginController {
	
	private Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private UserClient userClient;	
	@RequestMapping(value = "/login")
	@CrossOrigin
	@ResponseBody
	//public Object login(@RequestParam(name = "userName", required = false) String userName, @RequestParam(name = "password", required = false) String password) {
	public Object login(@RequestBody JSONObject userObj) {
		//if(userName != null && !"".equals(userName)) {
		if(userObj != null && userObj.getString("userName") != null && userObj.getString("password") != null) {
			String userName = userObj.getString("userName");
			String password = userObj.getString("password");
			logger.info("login userName=" + userName + "password=" + password );

			User user = userClient.findUserByUserName(userName);
			logger.info("user getUserid=" + user.getUserid() );
			
	        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(userName,password);
	        Subject subject = SecurityUtils.getSubject();
	        try {
	            subject.login(usernamePasswordToken);   //完成登录
	            Map<String, Object> result = new HashMap<>();
	    		result.put("user", subject.getPrincipal());
	    		result.put("sessionid", subject.getSession().getId());
	            logger.info("subject.getPrincipal()=" + subject.getPrincipal() + ",sessionid=" + subject.getSession().getId());
	            return ResponseUtil.makeSuccessResponse(result);
	        }catch(UnknownAccountException uaex){
	        	//throw new NRAPException(SystemErrorCodeType.E_USER_NOT_EXIST);
	        	return ResponseUtil.makeErrorResponse(uaex.toString(),"用户不存在");
			}catch(IncorrectCredentialsException icex){
				//throw new NRAPException(SystemErrorCodeType.E_USER_PASSWORD_WRONG);
				return ResponseUtil.makeErrorResponse(icex.toString(),"用户名或密码错误");
			}catch(LockedAccountException uaex){
				//throw new NRAPException(SystemErrorCodeType.E_USER_LOCKED);
				return ResponseUtil.makeErrorResponse(uaex.toString(),"用户锁定");
			}catch(AuthenticationException uaex){
				//throw new NRAPException(SystemErrorCodeType.E_USER_LOGIN_ABNOMAL);	
				return ResponseUtil.makeErrorResponse(uaex.toString(),"用户登录异常");
	        } catch(Exception e) {
	        	//e.printStackTrace();
	        //	throw new NRAPException(SystemErrorCodeType.E_USER_LOGIN_OTHER);
	        	return ResponseUtil.makeErrorResponse(e.toString(),"登录失败");
	        }
		}else {
			Subject subject = SecurityUtils.getSubject();
    		logger.info("login:subject.getPrincipal()" + subject.getPrincipal() + ",sessionid=" + subject.getSession().getId());
    		Map<String, Object> result = new HashMap<>();
    		Object user = subject.getPrincipal();
    		if(user != null) {
    			result.put("user", user);
        		result.put("sessionid", subject.getSession().getId());
    			return ResponseUtil.makeSuccessResponse(result);
    		}else {
    			result.put("success", false);
    			return result;
    		}
		}
	
    }
	
    @RequestMapping("/logout")
    @CrossOrigin
    @ResponseBody
    public Object logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
      //  return Response.success("logout");
        return ResponseUtil.makeSuccessResponse();
    }

}
