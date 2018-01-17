package com.videtek.jwt.demo.controller;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SSOController {

    /**
     * 单点登录（如已经登录，则直接跳转）
     * @param userCode 登录用户编码
     * @param token 登录令牌，令牌组成：sso密钥+用户名+日期，进行md5加密，举例：
     *      String secretKey = Global.getConfig("shiro.sso.secretKey");
     *      String token = Digests.md5(secretKey + userCode + DateUtils.getDate("yyyyMMdd"));
     * @param url 登录成功后跳转的url地址。
     * @param relogin 是否重新登录，需要重新登录传递true
     * 例如：http://localhost/project/sso/{token}?url=xxx&relogin=true
     */
    @RequestMapping(value = "sso/{userCode}/{token}")
    public String sso(@PathVariable String userCode, @PathVariable String token,
                      @RequestParam(required=true) String url, String relogin, Model model) {
        Object principal = SecurityUtils.getSubject().getPrincipal();
        // 如果已经登录
        if(principal != null){
            // 如果设置强制重新登录，则重新登录
            if (BooleanUtils.toBoolean(relogin)){
                SecurityUtils.getSubject().logout();
            }
            // 否则，直接跳转到目标页
            else{
//                return "redirect:" + Encodes.urlDecode2(url);
                return "redirect:" + url;
            }
        }
        // 进行单点登录
        if (token != null){
            UsernamePasswordToken upt = new UsernamePasswordToken();
            try {
                upt.setUsername(userCode); // 登录用户名
                upt.setPassword(token.toCharArray()); // 密码组成：sso密钥+用户名+日期，进行md5加密，举例： Digests.md5(secretKey+username+20150101)）
                //upt.setParams(upt.toString()); // 单点登录识别参数，see： AuthorizingRealm.assertCredentialsMatch
            } catch (Exception ex){
                if (!ex.getMessage().startsWith("msg:")){
                    ex = new AuthenticationException("msg:授权令牌错误，请联系管理员。");
                }
                model.addAttribute("exception", ex);
            }
            try {
                SecurityUtils.getSubject().login(upt);
//                return "redirect:" + Encodes.urlDecode2(url);
                return "redirect:" + url;
            } catch (AuthenticationException ae) {
                if (!ae.getMessage().startsWith("msg:")){
                    ae = new AuthenticationException("msg:授权错误，请检查用户配置，若不能解决，请联系管理员。");
                }
                model.addAttribute("exception", ae);
            }
        }
        return "error/403";
    }
}
