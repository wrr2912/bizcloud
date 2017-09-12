package com.dhxa.bizcloud.appservice.entity;

import java.util.Date;

public class SupervisionInstitution implements java.io.Serializable {
	private Long id;  //监督机构信息Id
	private String supervision;
	private String prefectureSupervision;
	private String qualitySupervision;
	private String qualitySupervisionArea;
	private String unitName;  //单位名称
	private String unitAbbreviation;  //单位简称
	private String legalRepresentative;  //法人代表
	private String legalPersonCode;  //法人代码
	private String postalAddress;  //通讯地址
	private String postalCode;  //邮政编码;国外邮政编码包含字母
	private String officialWebsiteLink;  //官网链接;地区铁路监督管理局录入，点击可进入监督机构官网
	private String remarks;  //备注
	private String telephoneWatch;  //值班电话
	//监督机构与项目关联信息
	private String entryName;  //项目名称;点击查看项目，链接项目
	private String projectNumber;  //项目编号;点击查看项目，链接项目
	private String projectContact; //项目联系人
	private String contactPhone;  //联系人电话
	//版本信息
	private String entryMan;  //录入人;系统自动填写
	private Date entryDate;  //录入日期;系统自动填写
	
	public SupervisionInstitution() {}
	public SupervisionInstitution(Long id) {
		this.id = id;
	}
	public SupervisionInstitution(Long id, String supervision, String prefectureSupervision, String qualitySupervision,
			String qualitySupervisionArea, String unitName, String unitAbbreviation, String legalRepresentative,
			String legalPersonCode, String postalAddress, String postalCode, String officialWebsiteLink, String remarks,
			String telephoneWatch, String entryName, String projectNumber, String projectContact, String contactPhone,
			String entryMan, Date entryDate) {
		super();
		this.id = id;
		this.supervision = supervision;
		this.prefectureSupervision = prefectureSupervision;
		this.qualitySupervision = qualitySupervision;
		this.qualitySupervisionArea = qualitySupervisionArea;
		this.unitName = unitName;
		this.unitAbbreviation = unitAbbreviation;
		this.legalRepresentative = legalRepresentative;
		this.legalPersonCode = legalPersonCode;
		this.postalAddress = postalAddress;
		this.postalCode = postalCode;
		this.officialWebsiteLink = officialWebsiteLink;
		this.remarks = remarks;
		this.telephoneWatch = telephoneWatch;
		this.entryName = entryName;
		this.projectNumber = projectNumber;
		this.projectContact = projectContact;
		this.contactPhone = contactPhone;
		this.entryMan = entryMan;
		this.entryDate = entryDate;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSupervision() {
		return supervision;
	}
	public void setSupervision(String supervision) {
		this.supervision = supervision;
	}
	public String getPrefectureSupervision() {
		return prefectureSupervision;
	}
	public void setPrefectureSupervision(String prefectureSupervision) {
		this.prefectureSupervision = prefectureSupervision;
	}
	public String getQualitySupervision() {
		return qualitySupervision;
	}
	public void setQualitySupervision(String qualitySupervision) {
		this.qualitySupervision = qualitySupervision;
	}
	public String getQualitySupervisionArea() {
		return qualitySupervisionArea;
	}
	public void setQualitySupervisionArea(String qualitySupervisionArea) {
		this.qualitySupervisionArea = qualitySupervisionArea;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getUnitAbbreviation() {
		return unitAbbreviation;
	}
	public void setUnitAbbreviation(String unitAbbreviation) {
		this.unitAbbreviation = unitAbbreviation;
	}
	public String getLegalRepresentative() {
		return legalRepresentative;
	}
	public void setLegalRepresentative(String legalRepresentative) {
		this.legalRepresentative = legalRepresentative;
	}
	public String getLegalPersonCode() {
		return legalPersonCode;
	}
	public void setLegalPersonCode(String legalPersonCode) {
		this.legalPersonCode = legalPersonCode;
	}
	public String getPostalAddress() {
		return postalAddress;
	}
	public void setPostalAddress(String postalAddress) {
		this.postalAddress = postalAddress;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getOfficialWebsiteLink() {
		return officialWebsiteLink;
	}
	public void setOfficialWebsiteLink(String officialWebsiteLink) {
		this.officialWebsiteLink = officialWebsiteLink;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getTelephoneWatch() {
		return telephoneWatch;
	}
	public void setTelephoneWatch(String telephoneWatch) {
		this.telephoneWatch = telephoneWatch;
	}
	public String getEntryName() {
		return entryName;
	}
	public void setEntryName(String entryName) {
		this.entryName = entryName;
	}
	public String getProjectNumber() {
		return projectNumber;
	}
	public void setProjectNumber(String projectNumber) {
		this.projectNumber = projectNumber;
	}
	public String getProjectContact() {
		return projectContact;
	}
	public void setProjectContact(String projectContact) {
		this.projectContact = projectContact;
	}
	public String getContactPhone() {
		return contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	public String getEntryMan() {
		return entryMan;
	}
	public void setEntryMan(String entryMan) {
		this.entryMan = entryMan;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
}
