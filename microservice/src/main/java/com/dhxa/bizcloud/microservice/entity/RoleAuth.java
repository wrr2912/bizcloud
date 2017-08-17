package com.dhxa.bizcloud.microservice.entity;

// Generated 2017-8-16 14:10:10 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;

/**
 * TaRoleAuth generated by hbm2java
 */
public class RoleAuth implements java.io.Serializable {

	private BigDecimal id;
	private BigDecimal roleId;
	private BigDecimal sysId;
	private Boolean isdelete;

	public RoleAuth() {
	}

	public RoleAuth(BigDecimal id) {
		this.id = id;
	}

	public RoleAuth(BigDecimal id, BigDecimal roleId, BigDecimal sysId,
			Boolean isdelete) {
		this.id = id;
		this.roleId = roleId;
		this.sysId = sysId;
		this.isdelete = isdelete;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public BigDecimal getRoleId() {
		return this.roleId;
	}

	public void setRoleId(BigDecimal roleId) {
		this.roleId = roleId;
	}

	public BigDecimal getSysId() {
		return this.sysId;
	}

	public void setSysId(BigDecimal sysId) {
		this.sysId = sysId;
	}

	public Boolean getIsdelete() {
		return this.isdelete;
	}

	public void setIsdelete(Boolean isdelete) {
		this.isdelete = isdelete;
	}

}