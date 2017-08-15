package com.dhxa.bizcloud.appservice.security;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import javax.annotation.Resource;
import javax.servlet.Filter;
import org.apache.log4j.Logger;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.mgt.DefaultFilterChainManager;
import org.apache.shiro.web.filter.mgt.NamedFilterList;
import org.apache.shiro.web.filter.mgt.PathMatchingFilterChainResolver;
import org.apache.shiro.web.servlet.AbstractShiroFilter;

public class FilterChainService {

	private Logger log = Logger.getLogger(FilterChainService.class);
	
	@Resource(name = "&shiroFilter")
	private ShiroFilterFactoryBean shiroFilterFactoryBean = null;
	
	@Resource(name = "shiroFilter")
	private AbstractShiroFilter shiroFilter = null;
	
	@Resource(name = "&chainDefinitionSectionMetaSource")
	private ChainDefinitionSectionMetaSource chainDefinitionSectionMetaSource = null;
	
	/*@Resource(name = "authDao")
	AuthDao authDao = null;*/
	
	public void updateFilterChain(){
		try{
			// 获取过滤管理器
			PathMatchingFilterChainResolver filterChainResolver = (PathMatchingFilterChainResolver) shiroFilter.getFilterChainResolver();
			DefaultFilterChainManager filterChainManager = (DefaultFilterChainManager) filterChainResolver.getFilterChainManager();
			
			//当前过滤链
			/*Iterator<Entry<String, NamedFilterList>> itr = filterChainManager.getFilterChains().entrySet().iterator();
			while(itr.hasNext()){
				Entry<String, NamedFilterList> entry = itr.next();				
				Iterator<Filter> itrFilter = entry.getValue().iterator();
				while(itrFilter.hasNext()){
					Filter filter = itrFilter.next();
					log.info(entry.getValue().getName() + ":" + filter.toString());
				}
			}*/
			
			/*String definitions = this.authDao.createShiroFilterChainDefitions() + this.chainDefinitionSectionMetaSource.getFilterChainDefinitions();
			log.info("更新filter chain:" + definitions);			
			
			// 清空初始权限配置
			filterChainManager.getFilterChains().clear();
			shiroFilterFactoryBean.getFilterChainDefinitionMap().clear();
			
			if(StringUtils.isEmpty(definitions)){
				return;
			}
			
			shiroFilterFactoryBean.setFilterChainDefinitions(definitions);

			//重新构建生成
			Map<String, String> chains = shiroFilterFactoryBean.getFilterChainDefinitionMap();
			for(Map.Entry<String, String> entry :chains.entrySet()) {
				String url = entry.getKey();
				String chainDefinition =entry.getValue().trim().replace(" ", "");
				filterChainManager.createChain(url,chainDefinition);
			}*/
			
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
	}
}
