package com.dhxa.bizcloud.microservice.message;

import com.rayfay.bizcloud.core.commons.exception.ErrorCode;
import com.rayfay.bizcloud.core.commons.exception.ErrorCodeDefinition;
import com.rayfay.bizcloud.core.commons.exception.ErrorCodeValuedEnum;

@ErrorCodeDefinition(thousands = 50)
public class SystemErrorCodeType {
    @ErrorCode(code = 101, msg = "获取数据失败！")
    public static ErrorCodeValuedEnum E_GET_DATA_FALED;

    @ErrorCode(code = 102, msg = "{0}失败！")
    public static ErrorCodeValuedEnum E_ACTION_FALED;

    @ErrorCode(code = 103, msg = "{0}不存在！")
    public static ErrorCodeValuedEnum E_NOT_EXITS;

    @ErrorCode(code=104,msg = "{0}已存在！")
    public static ErrorCodeValuedEnum E_IS_EXISTS;

    @ErrorCode(code = 105, msg = "{0}不可为空！")
    public static ErrorCodeValuedEnum E_NOT_NULL;

    @ErrorCode(code=106,msg = "({0}为空！")
    public static ErrorCodeValuedEnum E_IS_NULL;

    @ErrorCode(code=107,msg = "{0}超过最大长度{1}位！")
    public static ErrorCodeValuedEnum E_EXTREME_LENGTH;

    @ErrorCode(code=108,msg = "存在下级数据,无法删除！")
    public static ErrorCodeValuedEnum E_HAS_CHILDS;

    @ErrorCode(code=109,msg = "创建{0}ID不可设值！")
    public static ErrorCodeValuedEnum E_ID_NOT_NULL;

    @ErrorCode(code=110,msg = "更新{0}ID不可为空！")
    public static ErrorCodeValuedEnum E_ID_NULL;

    @ErrorCode(code=111,msg = "{0}无效！")
    public static ErrorCodeValuedEnum E_INVALID;
}
