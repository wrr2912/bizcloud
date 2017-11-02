package com.dhxa.bizcloud.appservice.entity.device;

public class EnterpriseBase {
	private Long id;
	private String eCode;
	private String eName;
	private String creditCode;
	private String orgCode;
	private String licenseCode;
	private String taxpayerNumber;
	private String eShortname;
	private Long pId;
	private String orgForm;
	private String eStatus;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String geteCode() {
		return eCode;
	}
	public void seteCode(String eCode) {
		this.eCode = eCode;
	}
	public String geteName() {
		return eName;
	}
	public void seteName(String eName) {
		this.eName = eName;
	}
	public String getCreditCode() {
		return creditCode;
	}
	public void setCreditCode(String creditCode) {
		this.creditCode = creditCode;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getLicenseCode() {
		return licenseCode;
	}
	public void setLicenseCode(String licenseCode) {
		this.licenseCode = licenseCode;
	}
	public String getTaxpayerNumber() {
		return taxpayerNumber;
	}
	public void setTaxpayerNumber(String taxpayerNumber) {
		this.taxpayerNumber = taxpayerNumber;
	}
	public String geteShortname() {
		return eShortname;
	}
	public void seteShortname(String eShortname) {
		this.eShortname = eShortname;
	}
	public Long getpId() {
		return pId;
	}
	public void setpId(Long pId) {
		this.pId = pId;
	}
	public String getOrgForm() {
		return orgForm;
	}
	public void setOrgForm(String orgForm) {
		this.orgForm = orgForm;
	}
	public String geteStatus() {
		return eStatus;
	}
	public void seteStatus(String eStatus) {
		this.eStatus = eStatus;
	}

	public String toString() {
		return "EnterpriseBase [id=" + id + ", eCode=" + eCode + ", eName=" + eName + ", creditCode=" + creditCode
				+ ", orgCode=" + orgCode + ", licenseCode=" + licenseCode + ", taxpayerNumber=" + taxpayerNumber
				+ ", eShortname=" + eShortname + ", pId=" + pId + ", orgForm=" + orgForm + ", eStatus=" + eStatus + "]";
	}
	
}
