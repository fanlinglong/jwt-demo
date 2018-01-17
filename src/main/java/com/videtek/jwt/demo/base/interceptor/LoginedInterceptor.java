package com.videtek.jwt.demo.base.interceptor;

import com.videtek.jwt.demo.common.RequestIpAddrUtil;
import com.videtek.jwt.demo.common.StaticString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * session过期自动跳转登录页面
 *
 * @author bing
 * @ClassName: LoginedInterceptor
 * @Description: TODO
 * @date 2016年7月19日 下午7:37:32
 */
public class LoginedInterceptor extends HandlerInterceptorAdapter {
    private static final Logger logger = LoggerFactory.getLogger(LoginedInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 其他情况判断header中是否有token，有的话继续用户的操作
        if (request.getParameter(StaticString.TOKEN) != null) {
            return true;
        }

        // 最后的情况就是进入登录页面
        logger.error("LoginedInterceptor: " + request.getRequestURI());
        logger.error("IP : " + RequestIpAddrUtil.getIpAddr(request));
        response.sendRedirect(request.getContextPath() + "/tologin.do");
        return false;

    }

}
