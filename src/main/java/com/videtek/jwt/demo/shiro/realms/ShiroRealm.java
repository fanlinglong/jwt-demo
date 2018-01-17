package com.videtek.jwt.demo.shiro.realms;

import com.videtek.jwt.demo.base.exception.BizException;
import com.videtek.jwt.demo.common.JedisCacheUtil;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class ShiroRealm extends AuthenticatingRealm {

    @Autowired
    private UserService userService;
    @Autowired
    private JedisCacheUtil jedisCacheUtil;

    @Override
    protected void assertCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        // 若单点登录，则使用单点登录授权方法。
        Object credentials = token.getCredentials();
        Object principal = token.getPrincipal();
        String tokenStr = token.toString();


        if (token.toString().equals(token.getCredentials())){
            // sso密钥+用户名+日期，进行md5加密，举例： Digests.md5(secretKey+username+20150101)）
//            String secretKey = Global.getConfig("shiro.sso.secretKey");
//            String password = Digests.md5(secretKey + token.getUsername() + DateUtils.getDate("yyyyMMdd"));
//            if (password.equals(String.valueOf(token.getPassword()))){
                return;
//            }
        }
        super.assertCredentialsMatch(token, info);
    }

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
            user = jedisCacheUtil.getToPojo(userInfoKey, User.class);
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
        jedisCacheUtil.set(userInfoKey, user, 60 * 3);
        return user;
    }
}
