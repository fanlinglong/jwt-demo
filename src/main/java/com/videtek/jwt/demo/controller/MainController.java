package com.videtek.jwt.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/main")
    public String main(String token, Model model) {
        model.addAttribute("token", token);
        return "main";
    }

}
