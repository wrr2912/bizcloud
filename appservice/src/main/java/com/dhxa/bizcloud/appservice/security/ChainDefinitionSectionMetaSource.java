package com.dhxa.bizcloud.appservice.security;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.config.Ini;
import org.apache.shiro.config.Ini.Section;
import org.springframework.beans.factory.FactoryBean;

public class ChainDefinitionSectionMetaSource implements FactoryBean<Ini.Section>{

	public Section getObject() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public Class<?> getObjectType() {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean isSingleton() {
		// TODO Auto-generated method stub
		return false;
	}

//	private Logger log = Logger.getLogger(ChainDefinitionSectionMetaSource.class);
//	private String filterChainDefinitions;
//	
//	/*@Resource(name = "authDao")
//	AuthDao authDao = null;*/
//	
//	@Override
//	public Section getObject() throws Exception {
//		// TODO Auto-generated method stub
//		
//		Ini ini = new Ini();
//		
//		String loadIni = this.authDao.createShiroFilterChainDefitions() + filterChainDefinitions;
//		log.info("加载chain:" + loadIni );
//        ini.load(loadIni);
//        Section section = ini.getSection(Ini.DEFAULT_SECTION_NAME); 
//        log.info("加载section:" + section.size() );
//        return section;
//	}
//	
//	public void setFilterChainDefinitions(String filterChainDefinitions) {  
//		this.filterChainDefinitions = filterChainDefinitions;  
//	} 
//
//	public String getFilterChainDefinitions() {
//		return filterChainDefinitions;
//	}
//
//	@Override
//	public Class<?> getObjectType() {
//		// TODO Auto-generated method stub
//		 return this.getClass();
//	}
//
//	@Override
//	public boolean isSingleton() {
//		// TODO Auto-generated method stub
//		return false;
//	}

}
