package com.dhxa.bizcloud.microservice.message;


public class  SystemMessage {
	public static final String DEPT_SERVICE_NAME="单位信息管理";
	public static final String M_DEPT_CREATE="创建公共编码";
	public static final String M_DEPT_UPDATE="更新公共编码";
	public static final String M_DEPT_DELETE="删除公共编码";
	public static final String M_DEPT_FIND="获取公共编码";
	public static final String M_DEPT_FIND_BY_ID="根据公共编码ID获取公共编码信息";
	public static final String M_DEPT_FIND_PAGE_BY_QUERY="根据检索条件获取单位信息(分页)";
	

	public static final String C_PAGE_SIZE="分页每页记录数";
	public static final String C_PAGE_NUM="分页页码";
	public static final String C_DEPT_ID="单位ID";
	public static final String C_DEPT_NAME="单位名称";
	//编码ID
	public static final String E_DEPT_ID="id";
	//单位名称
	public static final String E_DEPT_NAME="deptName";
	

	//页码
	public static final String E_PAGE_NUM="pageNumber";
	//每页记录数
	public static final String E_PAGE_SIZE="pageSize";
	
	
}
