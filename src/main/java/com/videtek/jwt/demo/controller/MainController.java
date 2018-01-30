package com.videtek.jwt.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class MainController {

    @RequestMapping("/main")
    public String main(String token, Model model, HttpServletResponse response) {
        model.addAttribute("token", token);
        response.setHeader("token", token);
        return "main";
    }

}
