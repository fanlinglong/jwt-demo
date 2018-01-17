package com.videtek.jwt.demo.common;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class HeaderUtils {
    public static Map<String, String> getHeadersInfo(HttpServletRequest request) {
        Map<String, String> map = new HashMap<String, String>();
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }
        return map;
    }

    public static String get(HttpServletRequest request, String key) {
        Map<String, String> map = getHeadersInfo(request);
        if (map.isEmpty()) {
            return null;
        }
        return map.get(key);
    }
}
