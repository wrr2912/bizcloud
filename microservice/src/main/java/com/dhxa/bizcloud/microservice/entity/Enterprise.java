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
	public Enterprise() {}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID",insertable = true, updatable = true, nullable = false)
	//ID
	private Long id;
	
	//企业名称
	@Column(name = "ENTERPRISE_NAME", nullable = false)
	private String enterprise_name;

	//企业标识
	@Column(name = "ENTERPRISE_IDENTIFICATION", nullable = false)
	private String enterprise_identification;
	
	//营业执照类别
	@Column(name = "LICENSE_TYPE", nullable = false)
	private String license_type;
	
	//上级企业名称
	@Column(name = "P_ENTERPRISE_NAME")
	private String p_enterprise_name;
	
	//上级企业标识
	@Column(name = "P_ENTERPRISE_IDENTIFICATION")
	private String p_enterprise_identification;
	
	//组织机构代码
	@Column(name = "ORGNIZATION_CODE", nullable = false)
	private String orgnization_code;
	
	//公司名称
	@Column(name = "COMPANY_NAME")
	private String company_name;
	
	//公司标识
	@Column(name = "COMPANY_IDENTIFICATION")
	private String company_identification;
	
	//行业隶属关系
	@Column(name = "INDUSTRY_AFFILIATION", nullable = false)
	private String industry_affiliation;

	//行业类别代码
	@Column(name = "INDUSTRY_CODE", nullable = false)
	private String industry_code;

	//成立时间
	@Column(name = "FOUNDING_TIME",columnDefinition="TIMESTAMP",nullable = false )
    @Temporal(TemporalType.TIMESTAMP) 
	private Date founding_time;

	//注册地址
	@Column(name = "REGISTER_ADDRESS", nullable = false)
	private String register_address;

	//生产地址
	@Column(name = "MANUFACTURER_ADDRESS")
	private String manufacturer_address;

	//邮政编码
	@Column(name = "POSTAL_CODE", nullable = false)
	private String postal_code;

	//企业性质
	@Column(name = "ENTERPRISE_NATURE")
	private String enterprise_nature;

	//法人代表
	@Column(name = "LEGAL_REPRESENTATIVE", nullable = false)
	private String legal_representative;

	//注册资金
	@Column(name = "REGISTERD_CAPITAL", nullable = false)
	private String registerd_capital;

	//企业职工
	@Column(name = "STAFF_NUMBER", nullable = false)
	private Long staff_number;

	//联系人
	@Column(name = "CONTACTS")
	private String contacts;

	//联系电话
	@Column(name = "CONTACT_NUMBER", nullable = false)
	private String contact_number;
	
	//电子邮箱
	@Column(name = "EMAIL")
	private String email;

	//传真
	@Column(name = "FAX")
	private String fax;
	
	//行政许可类别
	@Column(name = "LICENSING_STATISTICS", nullable = false)
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
	
	//属地监管机构
	@Column(name = "LOCAL_REGULATORS", nullable = false)
	private String local_regulators;

	//经济类型编码
	@Column(name = "ECNOMIC_CODING", nullable = false)
	private String economic_coding;
	
	//工商注册号
	@Column(name = "REGISTRATION_NUMBER", nullable = false)
	private String registration_number;
	
	//是否集团公司
	@Column(name = "group_flag", nullable = false)
	private String group_flag;
	
	//国民经济行业代码
	@Column(name = "N_ECNOMIC_CODE")
	private String n_ecnomic_code;
	
	//企业规模
	@Column(name = "SCALE", nullable = false)
	private String scale;

	//占地面积
	@Column(name = "AREA", nullable = false)
	private String area;
	
	//资产总额
	@Column(name = "ASSETS", nullable = false)
	private String assets;
	
	//年利润
	@Column(name = "PROFIT", nullable = false)
	private String profit;
	
	//主要负责人
	@Column(name = "RESPONSIBLE_PERSON", nullable = false)
	private String responsible_person;
	
	//负责人联系电话
	@Column(name = "RESPONSIBLE_CONTACTS", nullable = false)
	private String responsible_contacts;
	
	//负责人邮箱
	@Column(name = "RESPONSIBLE_EMAIL")
	private String responsible_email;
	
	//注册行政区划代码
	@Column(name = "REGISTER_ADMINISTRATIVE")
	private String register_administrative;
	
	//生产地区行政区划代码
	@Column(name = "MANUFACTURER_ADMINISTRATIVE")
	private String manufacturer_administrative;
	
	//经营范围
	@Column(name = "SCOPE", nullable = false)
	private String scope;
	
	//企业概况
	@Column(name = "PROFILE", nullable = false)
	private String profile;
	
	//企业经营状态
	@Column(name = "BUSINESS_STATUS", nullable = false)
	private String business_status;
	
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
	
	public String getEnterprise_identification() {
		return enterprise_identification;
	}

	public void setEnterprise_identification(String enterprise_identification) {
		this.enterprise_identification = enterprise_identification;
	}

	public String getLicense_type() {
		return license_type;
	}

	public void setLicense_type(String license_type) {
		this.license_type = license_type;
	}

	public String getP_enterprise_name() {
		return p_enterprise_name;
	}

	public void setP_enterprise_name(String p_enterprise_name) {
		this.p_enterprise_name = p_enterprise_name;
	}

	public String getP_enterprise_identification() {
		return p_enterprise_identification;
	}

	public void setP_enterprise_identification(String p_enterprise_identification) {
		this.p_enterprise_identification = p_enterprise_identification;
	}

	public String getOrgnization_code() {
		return orgnization_code;
	}

	public void setOrgnization_code(String orgnization_code) {
		this.orgnization_code = orgnization_code;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getCompany_identification() {
		return company_identification;
	}

	public void setCompany_identification(String company_identification) {
		this.company_identification = company_identification;
	}

	public String getIndustry_affiliation() {
		return industry_affiliation;
	}

	public void setIndustry_affiliation(String industry_affiliation) {
		this.industry_affiliation = industry_affiliation;
	}
	
	public String getIndustry_code() {
		return industry_code;
	}

	public void setIndustry_code(String industry_code) {
		this.industry_code = industry_code;
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
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getLocal_regulators() {
		return local_regulators;
	}

	public void setLocal_regulators(String local_regulators) {
		this.local_regulators = local_regulators;
	}
	
	public String getEconomic_coding() {
		return economic_coding;
	}

	public void setEconomic_coding(String economic_coding) {
		this.economic_coding = economic_coding;
	}

	public String getRegistration_number() {
		return registration_number;
	}

	public void setRegistration_number(String registration_number) {
		this.registration_number = registration_number;
	}

	public String getGroup_flag() {
		return group_flag;
	}

	public void setGroup_flag(String group_flag) {
		this.group_flag = group_flag;
	}

	public String getN_ecnomic_code() {
		return n_ecnomic_code;
	}

	public void setN_ecnomic_code(String n_ecnomic_code) {
		this.n_ecnomic_code = n_ecnomic_code;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAssets() {
		return assets;
	}

	public void setAssets(String assets) {
		this.assets = assets;
	}

	public String getProfit() {
		return profit;
	}

	public void setProfit(String profit) {
		this.profit = profit;
	}

	public String getResponsible_person() {
		return responsible_person;
	}

	public void setResponsible_person(String responsible_person) {
		this.responsible_person = responsible_person;
	}

	public String getResponsible_contacts() {
		return responsible_contacts;
	}

	public void setResponsible_contacts(String responsible_contacts) {
		this.responsible_contacts = responsible_contacts;
	}

	public String getResponsible_email() {
		return responsible_email;
	}

	public void setResponsible_email(String responsible_email) {
		this.responsible_email = responsible_email;
	}

	public String getRegister_administrative() {
		return register_administrative;
	}

	public void setRegister_administrative(String register_administrative) {
		this.register_administrative = register_administrative;
	}

	public String getManufacturer_administrative() {
		return manufacturer_administrative;
	}

	public void setManufacturer_administrative(String manufacturer_administrative) {
		this.manufacturer_administrative = manufacturer_administrative;
	}
	
	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getBusiness_status() {
		return business_status;
	}

	public void setBusiness_status(String business_status) {
		this.business_status = business_status;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getRemark() {
		return this.remark;
	}

	@Override
	public String toString() {
		return "Enterprise [id=" + id + ", enterprise_name=" + enterprise_name + ", enterprise_identification="
				+ enterprise_identification + ", license_type=" + license_type + ", p_enterprise_name="
				+ p_enterprise_name + ", p_enterprise_identification=" + p_enterprise_identification
				+ ", orgnization_code=" + orgnization_code + ", company_name=" + company_name
				+ ", company_identification=" + company_identification + ", industry_affiliation="
				+ industry_affiliation + ", industry_code=" + industry_code + ", founding_time=" + founding_time
				+ ", register_address=" + register_address + ", manufacturer_address=" + manufacturer_address
				+ ", postal_code=" + postal_code + ", enterprise_nature=" + enterprise_nature
				+ ", legal_representative=" + legal_representative + ", registerd_capital=" + registerd_capital
				+ ", staff_number=" + staff_number + ", contacts=" + contacts + ", contact_number=" + contact_number
				+ ", email=" + email + ", fax=" + fax + ", administrative_licensing_statistics="
				+ administrative_licensing_statistics + ", product_category=" + product_category + ", enterprise_type="
				+ enterprise_type + ", local_bureau=" + local_bureau + ", local_regulators=" + local_regulators
				+ ", economic_coding=" + economic_coding + ", registration_number=" + registration_number
				+ ", group_flag=" + group_flag + ", n_ecnomic_code=" + n_ecnomic_code + ", scale=" + scale + ", area="
				+ area + ", assets=" + assets + ", profit=" + profit + ", responsible_person=" + responsible_person
				+ ", responsible_contacts=" + responsible_contacts + ", responsible_email=" + responsible_email
				+ ", register_administrative=" + register_administrative + ", scope=" + scope + ", profile=" + profile
				+ ", business_status=" + business_status + ", remark=" + remark + "]";
	}


}
