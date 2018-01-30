package com.videtek.jwt.demo.base.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.videtek.jwt.demo.base.redis.RedisUtil;
import com.videtek.jwt.demo.common.*;
import com.videtek.jwt.demo.pojo.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class TokenInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        PrintWriter writer = null;
        HandlerMethod method = null;
        try {
            method = (HandlerMethod) handler;
        } catch (Exception e) {
            writer = response.getWriter();
            ResponseVO responseVO = ResponseCode.buildEnumResponseVO(ResponseCode.REQUEST_URL_NOT_SERVICE, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        response.setCharacterEncoding("utf-8");
        String token = RequestUtil.getHeaderIgnoreCase(request,"token");
        String userName = RequestUtil.getHeaderIgnoreCase(request,"userName");

        //token不存在
        if(StringUtils.isEmpty(token)) {
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.LOGIN_TOKEN_NOT_NULL, false);
            responseMessage(response, writer, responseVO);
            return false;
        }
        if(StringUtils.isEmpty(userName)){
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.USERID_NOT_NULL, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        User user = JWT.unsign(token, User.class);
        if(user == null){
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.USERID_NOT_UNAUTHORIZED, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        String tokenKey = "jwt:token:" + user.getUserName();
        String json = RedisUtil.get(tokenKey);
        RedisLogin redisLogin = GsonUtils.json2Obj(json, RedisLogin.class);
        //验证登录时间
        if(null == redisLogin){
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.RESPONSE_CODE_UNLOGIN_ERROR, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        if(!StringUtils.equals(token, redisLogin.getToken())){
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.USERID_NOT_UNAUTHORIZED, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        //判断用户名是否一致
        if(!StringUtils.equals(redisLogin.getuserName(), userName)){
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.USERID_NOT_UNAUTHORIZED, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        //系统时间>有效期（说明已经超过有效期）
        if (System.currentTimeMillis() > redisLogin.getRefTime()) {
            writer = response.getWriter();
            ResponseVO responseVO = LoginResponseCode.buildEnumResponseVO(LoginResponseCode.LOGIN_TIME_EXP, false);
            responseMessage(response, writer, responseVO);
            return false;
        }

        //重新刷新有效期
        redisLogin = new RedisLogin(userName, token, System.currentTimeMillis() + 60L* 1000L* 30L);
        RedisUtil.set(tokenKey , GsonUtils.toJson(redisLogin), 360000000);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    private void responseMessage(HttpServletResponse response, PrintWriter out, ResponseVO responseVO) {
        response.setContentType("application/json; charset=utf-8");
        JSONObject result = new JSONObject();
        result.put("result", responseVO);
        out.print(result);
        out.flush();
        out.close();
    }

}