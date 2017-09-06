package com.dhxa.bizcloud.microservice.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*
 * 监督机构
 */
@Entity
@Table(name="SUPERVISIONINSTITUTION")
public class SupervisionInstitution implements java.io.Serializable {
	//监督机构基本信息
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "SIID",insertable = true, updatable = true, nullable = false)
	private Long SIId;  //监督机构信息Id
	
	@Column(name = "UNITNAME", nullable = false)
	private String unitName;  //单位名称
	
	@Column(name = "UNTIABBREVIATION", nullable = false)
	private String unitAbbreviation;  //单位简称
	
	@Column(name = "LEGALREPRESENTATIVE", nullable = false)
	private String legalRepresentative;  //法人代表
	
	@Column(name = "LEGALPERSONCODE")
	private String legalPersonCode;  //法人代码
	
	@Column(name = "POSTALADDRESS", nullable = false)
	private String postalAddress;  //通讯地址
	
	@Column(name = "POSTALCODE", nullable = false)
	private String postalCode;  //邮政编码;国外邮政编码包含字母
	
	@Column(name = "OFFICIALWEBSITELINK", nullable = false)
	private String officialWebsiteLink;  //官网链接;地区铁路监督管理局录入，点击可进入监督机构官网
	
	@Column(name = "REMARKS")
	private String remarks;  //备注
	
	@Column(name = "TELEPHONEWATCH", nullable = false)
	private String telephoneWatch;  //值班电话
	
	//监督机构与项目关联信息
	@Column(name = "ENTRYNAME", nullable = false)
	private String entryName;  //项目名称;点击查看项目，链接项目
	
	@Column(name = "PROJECTNUMBER", nullable = false)
	private String projectNumber;  //项目编号;点击查看项目，链接项目
	
	@Column(name = "PROJECTCONTACT")
	private String projectContact; //项目联系人
	
	@Column(name = "CONTACTPHONE")
	private String contactPhone;  //联系人电话
	
	//版本信息
	@Column(name = "ENTRYMAN", nullable = false)
	private String entryMan;  //录入人;系统自动填写
	
	@Column(name = "ENTRYDATE", nullable = false)
	private Date entryDate;  //录入日期;系统自动填写
	
	public SupervisionInstitution() {}
	public SupervisionInstitution(Long SIId) {
		this.SIId = SIId;
	}
	public SupervisionInstitution(Long sIId, String unitName, String unitAbbreviation, String legalRepresentative,
			String legalPersonCode, String postalAddress, String postalCode, String officialWebsiteLink, String remarks,
			String telephoneWatch, String entryName, String projectNumber, String projectContact, String contactPhone,
			String entryMan, Date entryDate) {
		super();
		SIId = sIId;
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

	public Long getSIId() {
		return SIId;
	}

	public void setSIId(Long sIId) {
		SIId = sIId;
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
