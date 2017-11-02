package com.dhxa.bizcloud.appservice.entity;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;

public class Enterprise {
	public Enterprise() {}
	public Enterprise(JSONObject data) {
		this.setAdministrative_licensing_statistics(data.getString("administrative_licensing_statistics"));
		this.setArea(data.getString("area"));
		this.setAssets(data.getString("assets"));
		this.setBusiness_status(data.getString("business_status"));
		this.setCompany_identification(data.getString("company_identification"));
		this.setCompany_name(data.getString("company_name"));
		this.setContact_number(data.getString("contact_number"));
		this.setContacts(data.getString("contacts"));
		this.setEconomic_coding(data.getString("economic_coding"));
		this.setEmail(data.getString("email"));
		this.setEnterprise_identification(data.getString("enterprise_identification"));
		this.setEnterprise_name(data.getString("enterprise_name"));
		this.setEnterprise_nature(data.getString("enterprise_nature"));
		this.setEnterprise_type(data.getString("enterprise_type"));
		this.setFax(data.getString("fax"));
		this.setFounding_time(data.getDate("founding_time"));
		this.setGroup_flag(data.getString("group_flag"));
		this.setId(data.getLong("id"));
		this.setIndustry_affiliation(data.getString("industry_affiliation"));
		this.setIndustry_code(data.getString("industry_code"));
		this.setLegal_representative(data.getString("legal_representative"));
		this.setLicense_type(data.getString("license_type"));
		this.setLocal_bureau(data.getString("local_bureau"));
		this.setLocal_regulators(data.getString("local_regulators"));
		this.setManufacturer_address(data.getString("manufacturer_address"));
		this.setManufacturer_administrative(data.getString("manufacturer_administrative"));
		this.setN_ecnomic_code(data.getString("n_ecnomic_code"));
		this.setOrgnization_code(data.getString("orgnization_code"));
		this.setP_enterprise_identification(data.getString("p_enterprise_identification"));
		this.setP_enterprise_name(data.getString("p_enterprise_name"));
		this.setPostal_code(data.getString("postal_code"));
		this.setProduct_category(data.getString("product_category"));
		this.setProfile(data.getString("profile"));
		this.setProfit(data.getString("profit"));
		this.setRegister_address(data.getString("register_address"));
		this.setRegister_administrative(data.getString("register_administrative"));
		this.setRegisterd_capital(data.getString("registerd_capital"));
		this.setRegistration_number(data.getString("registration_number"));
		this.setRemark(data.getString("remark"));
		this.setResponsible_contacts(data.getString("responsible_contacts"));
		this.setResponsible_email(data.getString("responsible_email"));
		this.setResponsible_person(data.getString("responsible_person"));
		this.setScale(data.getString("scale"));
		this.setScope(data.getString("scope"));
		this.setStaff_number(data.getLong("staff_number"));
	}
	//ID
	private Long id;
	
	//企业名称
	private String enterprise_name;

	//企业标识
	private String enterprise_identification;
	
	//营业执照类别
	private String license_type;
	
	//上级企业名称
	private String p_enterprise_name;
	
	//上级企业标识
	private String p_enterprise_identification;
	
	//组织机构代码
	private String orgnization_code;
	
	//公司名称
	private String company_name;
	
	//公司标识
	private String company_identification;
	
	//行业隶属关系
	private String industry_affiliation;

	//行业类别代码
	private String industry_code;

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

	//联系电话
	private String contact_number;
	
	//电子邮箱
	private String email;

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
	
	//经济类型编码
	private String economic_coding;
	
	//工商注册号
	private String registration_number;
	
	//是否集团公司
	private String group_flag;
	
	//国民经济行业代码
	private String n_ecnomic_code;

	//属地监管机构
	private String local_regulators;
	
	//企业规模
	private String scale;

	//占地面积
	private String area;
	
	//资产总额
	private String assets;
	
	//年利润
	private String profit;
	
	//主要负责人
	private String responsible_person;
	
	//负责人联系电话
	private String responsible_contacts;
	
	//负责人邮箱
	private String responsible_email;
	
	//注册行政区划代码
	private String register_administrative;
	
	//生产地区行政区划代码
	private String manufacturer_administrative;
	
	//经营范围
	private String scope;
	
	//企业概况
	private String profile;
	
	//企业经营状态
	private String business_status;
	
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
