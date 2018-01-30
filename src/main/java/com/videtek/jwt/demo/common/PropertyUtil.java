package com.videtek.jwt.demo.common;

import java.io.IOException;
import java.util.Properties;

/**
 * 获取配置文件proj-config.properties中的值
 * @author chengbing
 *
 */
public class PropertyUtil {

	private static Properties prop;

	private PropertyUtil(){}
	
	static{
		reload();
	}
	
	public static boolean reload(){
		boolean flag = true;
		prop = new Properties();
		
		try {
			prop.load(PropertyUtil.class.getResourceAsStream("/resources/config.properties"));
			flag = false;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	public static Properties getSysProperties(){
		return prop;
	}
	
	/**
	 * 获取指定的系统属性值
	 * @param key
	 * @return
	 */
	public static String getProperty(String key){
		return prop.getProperty(key);
	}
	
	public static String getProperty(String key, String defaultValue){
		return prop.getProperty(key, defaultValue);
	}

}
