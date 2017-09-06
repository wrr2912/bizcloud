package com.dhxa.bizcloud.microservice.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "T_ENTERPRISE")
public class Enterprise {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID",insertable = true, updatable = true, nullable = false)
	//ID
	private Long id;
	
	//企业名称
	@Column(name = "ENTERPRISE_NAME", nullable = false)
	private String enterprise_name;

	//成立时间
	@Column(name = "FOUNDING_TIME",columnDefinition="TIMESTAMP",nullable = true )
    @Temporal(TemporalType.TIMESTAMP) 
	private Date founding_time;

	//注册地址
	@Column(name = "REGISTER_ADDRESS")
	private String register_address;

	//生产地址
	@Column(name = "MANUFACTURER_ADDRESS")
	private String manufacturer_address;

	//邮政编码
	@Column(name = "POSTAL_CODE")
	private String postal_code;

	//企业性质
	@Column(name = "ENTERPRISE_NATURE")
	private String enterprise_nature;

	//法人代表
	@Column(name = "LEGAL_REPRESENTATIVE")
	private String legal_representative;

	//注册资金
	@Column(name = "REGISTERD_CAPITAL")
	private String registerd_capital;

	//企业职工
	@Column(name = "STAFF_NUMBER")
	private Long staff_number;

	//联系人
	@Column(name = "CONTACTS")
	private String contacts;

	//联系地址
	@Column(name = "CONTACT_NUMBER")
	private String contact_number;

	//传真
	@Column(name = "FAX")
	private String fax;

	//行政许可类别
	@Column(name = "LICENSING_STATICS")
	private String administrative_licensing_statistics;

	//产品类别
	@Column(name = "PRODUCT_CATEGORY")
	private String product_category;

	//企业类型
	@Column(name = "ENTERPRISE_TYPE")
	private String enterprise_type;

	//地方局
	@Column(name = "LOCAL_BUREAU")
	private String local_bureau;

	//备注
	@Column(name = "REMARK")
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

	public String toString() {
		return "Enterprise [id=" + id + ", enterprise_name=" + enterprise_name + ", founding_time=" + founding_time
				+ ", register_address=" + register_address + ", manufacturer_address=" + manufacturer_address
				+ ", postal_code=" + postal_code + ", enterprise_nature=" + enterprise_nature
				+ ", legal_representative=" + legal_representative + ", registerd_capital=" + registerd_capital
				+ ", staff_number=" + staff_number + ", contacts=" + contacts + ", contact_number=" + contact_number
				+ ", fax=" + fax + ", administrative_licensing_statistics=" + administrative_licensing_statistics
				+ ", product_category=" + product_category + ", enterprise_type=" + enterprise_type + ", local_bureau="
				+ local_bureau + ", remark=" + remark + "]";
	}
}
