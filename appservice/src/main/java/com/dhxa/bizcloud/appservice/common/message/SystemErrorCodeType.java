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
}
