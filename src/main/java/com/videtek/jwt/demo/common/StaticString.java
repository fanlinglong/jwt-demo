package com.videtek.jwt.demo.common;


public interface StaticString {
	
	/**
	 * 当前用户
	 */
	public static final String CURRENT_USER = "currentUser";

	/**
	 * TOKEN
	 */
	public static final String TOKEN = "token";
	
	/**
	 * 当前用户所拥有的模块
	 */
	public static final String CURRENT_MODEL = "currentModel";
	
	/**
	 * 地图服务地址
	 */
	public static final String MAP_SERVICE = "mapService";
	
	/**
	 * 初始化地图中心点经度
	 */
	public static final String MAP_INIT_LON = "mapInitLon";
	
	/**
	 * 初始化地图中心点纬度
	 */
	public static final String MAP_INIT_LAT = "mapInitLat";
	
	/**
	 * 初始化地图放大级别
	 */
	public static final String MAP_INIT_LEVEL = "mapInitLevel";


	/**
	 * jwt
	 *
	 */
	public static final String JWT_ID = "jwt";
	public static final String JWT_SECRET = "hong1mu2zhi3ruan4jian5";
	public static final int JWT_TTL = 60*60*1000;  //millisecond
	public static final int JWT_REFRESH_INTERVAL = 55*60*1000;  //millisecond
	public static final int JWT_REFRESH_TTL = 12*60*60*1000;  //millisecond

}
