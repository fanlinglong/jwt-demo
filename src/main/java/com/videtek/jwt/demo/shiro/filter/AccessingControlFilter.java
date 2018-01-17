package com.videtek.jwt.demo.shiro.filter;


import com.videtek.jwt.demo.base.exception.BizException;
import com.videtek.jwt.demo.common.Base64Util;
import com.videtek.jwt.demo.common.JWTUtil;
import com.videtek.jwt.demo.common.JedisCacheUtil;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class AccessingControlFilter extends AccessControlFilter {

    @Autowired
    private JedisCacheUtil jedisCacheUtil;

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object o) throws Exception {
        Subject subject = this.getSubject(request, response);
        return subject.isAuthenticated();
    }

    @Override
    protected boolean onAccessDenied(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
        //是否验证通过
        boolean bool = false;
        try {
            HttpServletRequest req = WebUtils.toHttp(servletRequest);
            String firstLoginToken = req.getParameter("token");
            if(firstLoginToken == null){
                throw new BizException("");
            }

            //从token中获得信息
            Claims claims = JWTUtil.getClaims(firstLoginToken);
            String userCode = claims.getSubject();
            String userId = claims.getId();

            String redisLoginKey = "jwt:token:" + userCode;
            String redisToken = jedisCacheUtil.getString(redisLoginKey);
            if (!StringUtils.isBlank(redisToken)) {
                String[] arrayRedisToken = redisToken.split("@");
                //将用户传过来的token和redis中的做对比，若一样，认为已经登录
                if (arrayRedisToken[0].equals(firstLoginToken)) {
                    //比较这次访问与登录的时间间隔有多少分钟,如果大于5分钟，则更新redis中的上次访问时间信息，将过期时间从新设定为30分钟
                    long diffMin = JWTUtil.CompareTime(arrayRedisToken[1]);
                    if (diffMin >= 5) {
                        String currentAccessTime = Base64Util.base64Encoede(String.valueOf(System.currentTimeMillis()));
                        //更新redis中的token登录信息
                        jedisCacheUtil.set(redisLoginKey, arrayRedisToken[0] + "@" + currentAccessTime, 30 * 60);
                    }
                    bool = true;
                }
            }
        } catch (BizException e) {
            bool = true;
        } catch (Exception e) {
            return bool;
        }
        return bool;
    }
}
