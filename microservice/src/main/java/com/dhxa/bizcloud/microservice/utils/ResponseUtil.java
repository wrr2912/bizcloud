package com.dhxa.bizcloud.microservice.utils;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


public class ResponseUtil {

    /**
     * 分页结果
     * @param rowsTotal 总件数
     * @param rows 结果列表
     * @param <T> 继承了Collection的对象
     * @return 返回结果
     */
	public static <T extends Collection> Map<String, Object> makeSuccessResponse(long rowsTotal, T rows) {
		Map<String, Object> responseMap = new HashMap<>();

		responseMap.put("success", true);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("rows", rows);
		resultMap.put("totalNum", rowsTotal);

		responseMap.put("result", resultMap);

		return responseMap;
	}

    /**
     * 不分页结果
     * @param rows 结果列表
     * @param <T> 继承了Collection的对象
     * @return 返回结果
     */
	public static <T extends Collection> Map<String, Object> makeSuccessResponse(T rows) {
		Map<String, Object> responseMap = new HashMap<>();

		responseMap.put("success", true);

		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("rows", rows);
		resultMap.put("totalNum", rows != null ? rows.size() : 0);

		responseMap.put("result", resultMap);

		return responseMap;
	}

	/**
	 * 对象结果
	 * @param result 返回对象
	 * @return 返回结果
	 */
	public static Map<String, Object> makeSuccessResponse(Object result) {
		Map<String, Object> responseMap = new HashMap<>();

		responseMap.put("success", true);
		responseMap.put("result", result);

		return responseMap;
	}

	public static Map<String, Object> makeSuccessResponse() {
		Map<String, Object> responseMap = new HashMap<>();

		responseMap.put("success", true);

		return responseMap;
	}

    /**
     * 包含错误信息的结果
     * @param errorCode 错误代码
     * @param errorMessage 错误内容
     * @return 错误信息结果
     */
	public static Map<String, Object> makeErrorResponse(String errorCode, String errorMessage) {
		Map<String, Object> responseMap = new HashMap<>();

		responseMap.put("success", false);
		responseMap.put("message", errorMessage);
		responseMap.put("errorCode", errorCode);

		return responseMap;
	}
	
    
}
