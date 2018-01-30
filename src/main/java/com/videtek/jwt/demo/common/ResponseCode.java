package com.videtek.jwt.demo.common;

public class ResponseCode {
    public static String REQUEST_URL_NOT_SERVICE = "REQUEST_URL_NOT_SERVICE";

    public static ResponseVO buildEnumResponseVO(String requestUrlNotService, boolean b) {
        return new ResponseVO(500, requestUrlNotService, b);
    }
}
