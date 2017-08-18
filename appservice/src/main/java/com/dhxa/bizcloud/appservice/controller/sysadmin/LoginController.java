package com.dhxa.bizcloud.appservice.controller.sysadmin;

import org.apache.log4j.Logger;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dhxa.bizcloud.appservice.client.UserClient;
import com.dhxa.bizcloud.appservice.common.controller.Response;
import com.dhxa.bizcloud.appservice.entity.User;

@Controller
@EnableAutoConfiguration
public class LoginController {
	
	private Logger log = Logger.getLogger(LoginController.class);
	
	@Autowired
	private UserClient userClient;
	

	
	
	@RequestMapping("/login")
	@ResponseBody
    public String login(String userName,String password) {
		log.info("login userName=" + userName + "password=" + password );
		
		User user = userClient.findUserByUserName(userName);
		log.info("user getUserid=" + user.getUserid() );
		Response response = new Response();
        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(userName,password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(usernamePasswordToken);   //完成登录
            subject.getPrincipal();
            log.info("subject.getPrincipal()=" + subject.getPrincipal());
        }catch(UnknownAccountException uaex){
			response.setError("10001", "用户名不存在");
		}catch(IncorrectCredentialsException icex){
			 response.setError("10002", "密码错误");
		}catch(LockedAccountException uaex){
			response.setError("10003", "用户已锁定");
		}catch(AuthenticationException uaex){
			response.setError("10004", "登录异常");		
        } catch(Exception e) {
        	//e.printStackTrace();
        	response.setError("10005", "else");
        }
        
        return response.toJson();
    }
	
    @RequestMapping("/logout")
    @ResponseBody
    public String logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return Response.success("logout");
    }

}