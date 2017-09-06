package com.dhxa.bizcloud.microservice.message;


public class  SystemMessage {
	//页码
	public static final String E_PAGE_NUM="pageNumber";
	//每页记录数
	public static final String E_PAGE_SIZE="pageSize";
	
	public static final String C_PAGE_SIZE="分页每页记录数";
	public static final String C_PAGE_NUM="分页页码";
	
	public static final String DEPT_SERVICE_NAME="单位信息管理";
	public static final String M_DEPT_CREATE="创建单位信息";
	public static final String M_DEPT_UPDATE="更新单位信息";
	public static final String M_DEPT_DELETE="删除单位记录";
	public static final String M_DEPT_FIND="获取单位信息列表";
	public static final String M_DEPT_FIND_BY_ID="根据单位ID获取单位信息";
	public static final String M_DEPT_FIND_PAGE_BY_QUERY="根据检索条件获取单位信息(分页)";

	
	public static final String C_DEPT_ID="单位ID";
	public static final String C_DEPT_NAME="单位名称";
	//编码ID
	public static final String E_DEPT_ID="id";
	//单位名称
	public static final String E_DEPT_NAME="deptName";

	public static final String M_ENTERPRISE_CREATE = "创建企业基本信息";
	public static final String M_ENTERPRISE_UPDATE="更新企业基本信息";
	public static final String M_ENTERPRISE_DELETE="删除企业基本信息记录";
	public static final String M_ENTERPRISE_FIND="获取企业基本信息列表";
	public static final String M_ENTERPRISE_FIND_BY_ID="根据企业信息ID获取企业信息";
	public static final String M_ENTERPRISE_FIND_PAGE_BY_QUERY="根据检索条件获取企业基本信息(分页)";
	
	public static final String C_ENTERPRISE_ID="单位ID";
	public static final String C_ENTERPRISE_NAME="单位名称";
	//编码ID
	public static final String E_ENTERPRISE_ID="id";
	//单位名称
	public static final String E_ENTERPRISE_NAME="enterpriseName";

	
	
	public static final String M_PERSONNEL_CREATE="创建公共编码";
	public static final String M_PERSONNEL_UPDATE="更新公共编码";
	public static final String M_PERSONNEL_DELETE="删除公共编码";
	public static final String M_PERSONNEL_FIND="获取公共编码";
	public static final String M_PERSONNEL_FIND_BY_ID="根据公共编码ID获取公共编码信息";
	public static final String M_PERSONNEL_FIND_PAGE_BY_QUERY="根据检索条件获取人员信息(分页)";
	
	public static final String C_PERSONNEL_NAME="人员姓名";
	public static final String C_PERSONNEL_ID="人员ID";
	//人员名称
	public static final String E_PERSONNEL_NAME="personnelName";
	//编码ID
	public static final String E_PERSONNEL_ID="id";
	
	
}
