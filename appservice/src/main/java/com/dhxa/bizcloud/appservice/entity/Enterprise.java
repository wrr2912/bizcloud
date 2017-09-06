package com.dhxa.bizcloud.appservice.entity;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;


public class Enterprise {
	public Enterprise() {}
	public Enterprise(JSONObject data) {
		this.setId(data.getLong("id"));
		this.setEnterprise_name(data.getString("enterprise_name"));
    	this.setAdministrative_licensing_statistics(data.getString("administrative_licensing_statistics"));
    	this.setContact_number(data.getString("contact_number"));
    	this.setContacts(data.getString("contacts"));
    	this.setEnterprise_nature(data.getString("enterprise_nature"));
    	this.setEnterprise_type(data.getString("enterprise_type"));
    	this.setFax(data.getString("fax"));
    	this.setFounding_time(data.getDate("founding_time"));
    	this.setLegal_representative(data.getString("legal_representative"));
    	this.setLocal_bureau(data.getString("local_bureau"));
    	this.setManufacturer_address(data.getString("manufacturer_address"));
    	this.setPostal_code(data.getString("postal_code"));
    	this.setProduct_category(data.getString("product_category"));
    	this.setRegister_address(data.getString("register_address"));
    	this.setRegisterd_capital(data.getString("registerd_capital"));
    	this.setRemark(data.getString("remark"));
    	this.setStaff_number(data.getLong("staff_number"));
	}
	//ID
	private Long id;
	
	//企业名称
	private String enterprise_name;

	//成立时间
	private Date founding_time;

	//注册地址
	private String register_address;

	//生产地址
	private String manufacturer_address;

	//邮政编码
	private String postal_code;

	//企业性质
	private String enterprise_nature;

	//法人代表
	private String legal_representative;

	//注册资金
	private String registerd_capital;

	//企业职工
	private Long staff_number;

	//联系人
	private String contacts;

	//联系地址
	private String contact_number;

	//传真
	private String fax;

	//行政许可类别
	private String administrative_licensing_statistics;

	//产品类别
	private String product_category;

	//企业类型
	private String enterprise_type;

	//地方局
	private String local_bureau;

	//备注
	private String remark;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEnterprise_name() {
		return enterprise_name;
	}

	public void setEnterprise_name(String enterprise_name) {
		this.enterprise_name = enterprise_name;
	}

	public Date getFounding_time() {
		return founding_time;
	}

	public void setFounding_time(Date founding_time) {
		this.founding_time = founding_time;
	}

	public String getRegister_address() {
		return register_address;
	}

	public void setRegister_address(String register_address) {
		this.register_address = register_address;
	}

	public String getManufacturer_address() {
		return manufacturer_address;
	}

	public void setManufacturer_address(String manufacturer_address) {
		this.manufacturer_address = manufacturer_address;
	}

	public String getPostal_code() {
		return postal_code;
	}

	public void setPostal_code(String postal_code) {
		this.postal_code = postal_code;
	}

	public String getEnterprise_nature() {
		return enterprise_nature;
	}

	public void setEnterprise_nature(String enterprise_nature) {
		this.enterprise_nature = enterprise_nature;
	}

	public String getLegal_representative() {
		return legal_representative;
	}

	public void setLegal_representative(String legal_representative) {
		this.legal_representative = legal_representative;
	}

	public String getRegisterd_capital() {
		return registerd_capital;
	}

	public void setRegisterd_capital(String registerd_capital) {
		this.registerd_capital = registerd_capital;
	}

	public Long getStaff_number() {
		return staff_number;
	}

	public void setStaff_number(Long staff_number) {
		this.staff_number = staff_number;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getContact_number() {
		return contact_number;
	}

	public void setContact_number(String contact_number) {
		this.contact_number = contact_number;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getAdministrative_licensing_statistics() {
		return administrative_licensing_statistics;
	}

	public void setAdministrative_licensing_statistics(String administrative_licensing_statistics) {
		this.administrative_licensing_statistics = administrative_licensing_statistics;
	}

	public String getProduct_category() {
		return product_category;
	}

	public void setProduct_category(String product_category) {
		this.product_category = product_category;
	}

	public String getEnterprise_type() {
		return enterprise_type;
	}

	public void setEnterprise_type(String enterprise_type) {
		this.enterprise_type = enterprise_type;
	}

	public String getLocal_bureau() {
		return local_bureau;
	}

	public void setLocal_bureau(String local_bureau) {
		this.local_bureau = local_bureau;
	}
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getRemark() {
		return this.remark;
	}

}
