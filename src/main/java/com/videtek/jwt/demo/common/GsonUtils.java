package com.videtek.jwt.demo.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.List;

public class GsonUtils {

    /**
     * 将对象转为Json字符串
     */
    public static String toJson(Object obj) {
        GsonBuilder builder = new GsonBuilder();
        builder.setDateFormat("yyyy-MM-dd HH:mm:ss");
        Gson gson = builder.create();
        return gson.toJson(obj);
    }

    /**
     * json字符串转对象
     */
    public static <T> T json2Obj(String json, Class<T> clazz) {
        if (json == null || "".equals(json.trim())) {
            return null;
        }
        GsonBuilder builder = new GsonBuilder();
        builder.setDateFormat("yyyy-MM-dd HH:mm:ss");
        Gson gson = builder.create();
        return gson.fromJson(json, clazz);
    }

    /**
     * 将对象转化成一个新对象
     */
    public static Object parseObj(Object src, Class clazz) {
        if (src == null) return null;
        String json = toJson(src);
        return json2Obj(json, clazz);
    }

    /**
     * 转化列表
     */
    public static List<?> parseList(List<?> list, Class clazz) {
        if (list != null) {
            List newList = new ArrayList<>();
            for (Object object : list) {
                Object obj = parseObj(object, clazz);
                newList.add(obj);
            }
            return newList;
        } else {
            return null;
        }
    }

}
