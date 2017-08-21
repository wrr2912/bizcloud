package com.dhxa.bizcloud.appservice.common.message;

import com.rayfay.bizcloud.core.commons.exception.ErrorCode;
import com.rayfay.bizcloud.core.commons.exception.ErrorCodeDefinition;
import com.rayfay.bizcloud.core.commons.exception.ErrorCodeValuedEnum;

@ErrorCodeDefinition(thousands = 4)
public class SystemErrorCodeType {
    @ErrorCode(msg = "获取数据失败！")
    public static ErrorCodeValuedEnum E_GET_DATA_FALED;

    @ErrorCode(code = 2, msg = "{0}失败！")
    public static ErrorCodeValuedEnum E_ACTION_FALED;
    
    @ErrorCode(code = 1001, msg = "用户名不存在！")
    public static ErrorCodeValuedEnum E_USER_NOT_EXIST;
    
    @ErrorCode(code = 1002, msg = "用户名不存在！")
    public static ErrorCodeValuedEnum E_USER_PASSWORD_WRONG;
    
    @ErrorCode(code = 1003, msg = "用户已锁定！")
    public static ErrorCodeValuedEnum E_USER_LOCKED;
    
    @ErrorCode(code = 1004, msg = "用户登录异常！")
    public static ErrorCodeValuedEnum E_USER_LOGIN_ABNOMAL;
    
    @ErrorCode(code = 1005, msg = "其他用户登录错误！")
    public static ErrorCodeValuedEnum E_USER_LOGIN_OTHER;
}
