package com.videtek.jwt.demo.common;

public class RedisLogin {
    private String userName;
    private String token;
    private long refTime;// 有效时间millisecond

    public RedisLogin() {
    }

    public RedisLogin(String userName, String token, long refTime) {
        this.userName = userName;
        this.token = token;
        this.refTime = refTime;
    }

    public String getuserName() {
        return userName;
    }

    public void setuserName(String userName) {
        this.userName = userName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getRefTime() {
        return refTime;
    }

    public void setRefTime(long refTime) {
        this.refTime = refTime;
    }
}
