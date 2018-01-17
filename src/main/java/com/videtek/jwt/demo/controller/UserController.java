package com.videtek.jwt.demo.controller;

import com.videtek.jwt.demo.common.WebResult;
import com.videtek.jwt.demo.pojo.User;
import com.videtek.jwt.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("user")
public class UserController {


    @Resource
    private UserService userService;

    public String toView() {
        return "";
    }

    @RequestMapping("add")
    @ResponseBody
    public void doSave(User user) {
        userService.add(user);
        WebResult.build(200, "注册成功！");
        return;
    }
}
