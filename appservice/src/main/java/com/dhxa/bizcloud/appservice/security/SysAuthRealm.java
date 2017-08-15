package com.dhxa.bizcloud.appservice.security;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class SysAuthRealm extends AuthorizingRealm {

	private Logger log = Logger.getLogger(SysAuthRealm.class);
	
	/*@Resource(name = "userDao")
	UserDao userDao = null;*/
	
	/*进入授权方法一共有三种情况：
	1、subject.hasRole(“admin”) 或 subject.isPermitted(“admin”)：自己去调用这个是否有什么角色或者是否有什么权限的时候；
	2、@RequiresRoles("admin") ：在方法上加注解的时候；
	3、[@shiro.hasPermission name = "admin"][/@shiro.hasPermission]：在页面上加shiro标签的时候，即进这个页面的时候扫描到有这个标签的时候。*/
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		// TODO Auto-generated method stub
		log.debug("shiro验证-授权");
		try{
			/*String loginUserName = (String) principalCollection.getPrimaryPrincipal();
			log.info("loginUserName=" + loginUserName);
			User user = this.userDao.queryUserByUserName(loginUserName);
			if(user == null){
				return null;
			}
			
			//查询用户的全部角色，并返回SimpleAuthorizationInfo
			List<String> list = this.userDao.queryUserRoleIds(user.getUserId()+"");
			if(list == null || list.size() == 0){
				return null;
			}
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			for(String roleId : list){
				info.addRole(roleId);
				//info.addStringPermissions( role.getPermissions() );//如果你添加了对权限的表，打开此注释，添加角色具有的权限  
			}
			return info;*/
			
			  
	        //Role role = userOperator.getByRoleId(user.getRoleId());  
	        //info.addRole(role.getRoleName());
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		// TODO Auto-generated method stub
		log.info("shiro验证-登录");
		try{
			//用户输入用户名和密码 userToken
			UsernamePasswordToken userToken = (UsernamePasswordToken) token;
			/*//从数据库查询的用户信息
			User user = this.userDao.queryUserByUserName(userToken.getUsername());
			if(user != null){
				//匹配用户名和密码
				return new SimpleAuthenticationInfo(user.getUserName(),user.getPassword(), getName());
			}*/
			
			if(userToken.getUsername().equals("admin")){
				return new SimpleAuthenticationInfo("admin","admin", "admin");
			}
			
		}catch(Exception ex){
			ex.printStackTrace();
			throw new AuthenticationException(ex);
		}
		return null;
	}

}
