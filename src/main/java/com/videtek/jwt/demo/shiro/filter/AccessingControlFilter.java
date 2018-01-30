package com.videtek.jwt.demo.shiro.filter;


import com.videtek.jwt.demo.common.RequestUtil;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class AccessingControlFilter extends AccessControlFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object o) throws Exception {
        Subject subject = this.getSubject(request, response);
        return subject.isAuthenticated();
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        //是否验证通过
        boolean bool = false;
        HttpServletRequest req = WebUtils.toHttp(request);
        String token = RequestUtil.getHeaderIgnoreCase(req,"token");
        if (token == null) {
            // 跳转到登录
            redirectToLogin(request, response);
            return true;
        }
        return bool;
    }
}
