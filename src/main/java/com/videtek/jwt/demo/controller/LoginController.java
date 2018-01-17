package com.videtek.jwt.demo.controller;


import com.videtek.jwt.demo.common.*;
import com.videtek.jwt.demo.common.*;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
public class LoginController {

    private Logger logger = LoggerFactory.getLogger(LoggerFactory.class);

    @Autowired
    private JedisCacheUtil jedisCacheUtil;
    @Autowired
    private UserService userService;

    @RequestMapping("/tologin")
    public String toLogin() {
        return "login";
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.POST)
    @ResponseBody
    public WebResult content(@RequestParam("userName") String userName, @RequestParam("password") String password, HttpServletRequest request, HttpServletResponse response) {

        String userInfoKey = "jwt:user:" + userName;
        String tokenKey = "jwt:token:" + userName;

        try {
            if (StringUtils.isBlank(userName) || StringUtils.isBlank(password)) {
                throw new UnknownAccountException();
            }
            //1. 执行登录
            //把用户名和密码封装为UsernamePasswordToken对象
            UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
            SecurityUtils.getSubject().login(token);

            //2.获取用户信息userEntity,redis中不存在则存入redis
            User user;
            //2.1 从redis中获取或从数据库中获取
            String strUserInfo = jedisCacheUtil.getString(userInfoKey);
            if (StringUtils.isNotBlank(strUserInfo)) {
                user = GsonUtils.json2Obj(strUserInfo, User.class);
            } else {
                user = addUserInfoToRedis(userName, userInfoKey);
            }

            // 生成token
            String subject = strUserInfo;
            String jwtToken = JWTUtil.create(user.getUserName(), subject, StaticString.JWT_TTL);


            //3.生成Token信息并保存到redis
            JWTObj JWTObj = addTokenToRedis(user, jwtToken, tokenKey);


            return WebResult.build(200, "登录成功！", JWTObj);
            //所有认证异常的父类
        } catch (AuthenticationException e) {
            logger.error("登录失败！", e);
            return WebResult.build(401, "用户名或密码错误！");
        }
    }

    private JWTObj addTokenToRedis(User user, String jwtToken, String tokenKey) {
        JWTObj jwtobj = new JWTObj();
        jwtobj.setToken(jwtToken);
        BeanUtils.copyProperties(user, jwtobj);
        jedisCacheUtil.set(tokenKey, jwtobj, 60 * 3);
        return jwtobj;
    }

    private User addUserInfoToRedis(String userName, String userInfoKey) {
        User user = userService.getUser(userName);
        jedisCacheUtil.set(userInfoKey, user, 60 * 3);
        return user;
    }

}
