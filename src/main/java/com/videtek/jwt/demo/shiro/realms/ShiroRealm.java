package com.videtek.jwt.demo.shiro.realms;

import com.videtek.jwt.demo.base.exception.BizException;
import com.videtek.jwt.demo.common.GsonUtils;
import com.videtek.jwt.demo.base.redis.RedisUtil;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class ShiroRealm extends AuthenticatingRealm {

    @Autowired
    private UserService userService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        //1.把AuthenticationToken转换为UsernamePasswordToken
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;

        //2.从UsernamePasswordToken中获取userCode
        String username = usernamePasswordToken.getUsername();
        String userInfoKey = "jwt:user:" + username;
        User user = null;
        //3.获取用户信息userEntity
        //3.1 从redis中获取

        try {
            String json = RedisUtil.get(userInfoKey);
            user = GsonUtils.json2Obj(json, User.class);
            if (user == null) {
                user = addUserAndGetUser(username, userInfoKey);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (user == null) {
            throw new UnknownAccountException();// 没找到帐号
        }
        //6.根据用户的情况，来构建AuthenticationInfo对象并返回
        String credentials = user.getPassword();
        //使用ByteSource.Util.bytes()来计算盐值
        ByteSource credentialsSalt = ByteSource.Util.bytes(username);
        return new SimpleAuthenticationInfo(user, credentials, credentialsSalt, getName());

    }

    private User addUserAndGetUser(String username, String userInfoKey) {
        User user = userService.getUser(username);
        if (user == null) {
            throw new BizException("用户不存在");
        }
        RedisUtil.set(userInfoKey, GsonUtils.toJson(user));
        return user;
    }
}
