package com.videtek.jwt.demo.controller;

import com.videtek.jwt.demo.common.WebResult;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("userhelp")
public class UserHelpController {

    @Resource
    private UserService userService;

    @RequestMapping("reg")
    @ResponseBody
    public void doSave(User user) {
        boolean success = userService.add(user);
        WebResult.build(200, success ? "注册成功！" : "注册失败！");
        return;
    }
}
