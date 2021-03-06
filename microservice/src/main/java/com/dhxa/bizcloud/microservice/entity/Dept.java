package com.dhxa.bizcloud.microservice.entity;

// Generated 2017-8-16 14:10:10 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TaDept generated by hbm2java
 */
@Entity
@Table(name = "TA_DEPT")
public class Dept implements java.io.Serializable {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID",insertable = true, updatable = true, nullable = false)
	private Long id;
	
	@Column(name = "DEPT_NAME")
	private String deptName;
	
	@Column(name = "PROVINCE")
	private String province;
	
	@Column(name = "CITY")
	private String city;
	
	@Column(name = "COUNTRY")
	private String country;
	
	@Column(name = "CREATE_TIME")
	private String createTime;
	
	@Column(name = "CREATOR")
	private Long creator;
	
	@Column(name = "ISDELETE")
	private String isdelete;
	
	@Column(name = "HIGHER_DEPT_ID")
	private Long higherDeptId;
	
	@Column(name = "EMAIL")
	private String email;

	public Dept() {
	}

	public Dept(Long id) {
		this.id = id;
	}

	public Dept(Long id, String deptName, String province, String city,
			String country, String createTime, Long creator,
			String isdelete, Long higherDeptId, String email) {
		this.id = id;
		this.deptName = deptName;
		this.province = province;
		this.city = city;
		this.country = country;
		this.createTime = createTime;
		this.creator = creator;
		this.isdelete = isdelete;
		this.higherDeptId = higherDeptId;
		this.email = email;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getProvince() {
		return this.province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public Long getCreator() {
		return this.creator;
	}

	public void setCreator(Long creator) {
		this.creator = creator;
	}

	public String getIsdelete() {
		return this.isdelete;
	}

	public void setIsdelete(String isdelete) {
		this.isdelete = isdelete;
	}

	public Long getHigherDeptId() {
		return this.higherDeptId;
	}

	public void setHigherDeptId(Long higherDeptId) {
		this.higherDeptId = higherDeptId;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
