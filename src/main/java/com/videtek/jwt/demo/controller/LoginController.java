package com.videtek.jwt.demo.controller;


import com.videtek.jwt.demo.base.redis.RedisUtil;
import com.videtek.jwt.demo.common.*;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private UserService userService;

    @RequestMapping("/tologin")
    public String toLogin() {
        return "login";
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.POST)
    @ResponseBody
    public WebResult content(@RequestParam("userName") String userName, @RequestParam("password") String password, String flag, HttpServletRequest request, HttpServletResponse response) {

        String userInfoKey = "jwt:user:" + userName;
        String tokenKey = "jwt:token:" + userName;

        try {
            // 检查是否已经登录了
            String json = RedisUtil.get(tokenKey);
            RedisLogin logined = GsonUtils.json2Obj(json, RedisLogin.class);

            String thFlag = "1";
            if (logined != null && !thFlag.equals(flag)) {
                return WebResult.build(200, "当前账号已经登录了，是否踢下线？如需踢下线,增加参数 flag=1", null);
            }

            //1. 执行登录
            //把用户名和密码封装为UsernamePasswordToken对象
            UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
            SecurityUtils.getSubject().login(token);

            //2.获取用户信息userEntity,redis中不存在则存入redis
            User user;
            //2.1 从redis中获取或从数据库中获取
            String strUserInfo = RedisUtil.get(userInfoKey);
            if (StringUtils.isNotBlank(strUserInfo)) {
                user = GsonUtils.json2Obj(strUserInfo, User.class);
            } else {
                user = addUserInfoToRedis(userName, userInfoKey);
            }

            //2.2 生成token
            String jwtToken = JWT.sign(user, StaticString.JWT_TTL);

            //3.生成Token信息并保存到redis
            RedisLogin redisLogin = addTokenToRedis(user.getUserName(), jwtToken, tokenKey);

            response.setHeader("token", jwtToken);
            response.setHeader("userName", user.getUserName());
            return WebResult.build(200, "登录成功！", redisLogin);
        } catch (AuthenticationException e) {//所有认证异常的父类
            logger.error("登录失败！", e);
            return WebResult.build(401, "用户名或密码错误！");
        }catch (Exception e){
            logger.error("登录失败！", e);
            return WebResult.build(500, "登录失败！");
        }
    }

    private RedisLogin addTokenToRedis(String userName, String jwtToken, String tokenKey) {
        RedisLogin redisLogin = new RedisLogin(userName, jwtToken, System.currentTimeMillis() + 60L * 1000L * 30L);
        RedisUtil.set(tokenKey, GsonUtils.toJson(redisLogin));
        return redisLogin;
    }

    private User addUserInfoToRedis(String userName, String userInfoKey) {
        User user = userService.getUser(userName);
        RedisUtil.set(userInfoKey, GsonUtils.toJson(user));
        return user;
    }

}
