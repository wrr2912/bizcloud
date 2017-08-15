package com.dhxa.bizcloud.appservice.security;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;

public class RoleHasUrlAcessAuthFilter extends AuthorizationFilter {

	private Logger log = Logger.getLogger(RoleHasUrlAcessAuthFilter.class);
	
	@Override
	protected boolean isAccessAllowed(ServletRequest request,ServletResponse response, Object mappedValue) throws Exception {
		// TODO Auto-generated method stub		
		HttpServletRequest httpServletRequest = ((HttpServletRequest) request);
		log.info("访问URL权限校验：" + httpServletRequest.getRequestURL());
		Subject subject = getSubject(request, response);  
        String[] rolesArray = (String[]) mappedValue;          
		
        if (rolesArray == null || rolesArray.length == 0) {   
        	log.info("全部角色不能访问");
            return false;   
        }
        
        for(int i=0;i<rolesArray.length;i++){    
        	log.info("访问URL,可访问的角色:" + rolesArray[i]);
            if(subject.hasRole(rolesArray[i])){   
            	log.info("访问URL,可访问的角色:" + rolesArray[i] + "，用户包含改角色通过");
                return true;    
            }    
        }    
        return false;  
	}

}
