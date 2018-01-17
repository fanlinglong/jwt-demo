package com.videtek.jwt.demo.common;

public class WebResult {
    private int code;
    private String message;
    private String data;

    public WebResult(int code, String message, String data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public WebResult(int code, String message) {
        this.code = code;
        this.message = message;
    }


    public static WebResult build(int code, String message, Object object) {
        String data = GsonUtils.toJson(object);
        return new WebResult(code, message, data);
    }

    public static WebResult build(int code, String message) {
        return new WebResult(code, message);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
