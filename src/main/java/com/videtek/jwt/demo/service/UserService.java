package com.videtek.jwt.demo.service;

import com.videtek.jwt.demo.common.PasswordUtil;
import com.videtek.jwt.demo.dao.UserMapper;
import com.videtek.jwt.demo.pojo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Resource
    private UserMapper userMapper;

    public User getUser(String userName, String password) {
        User loginUser = userMapper.login(userName, password);
        return loginUser;
    }

    public User getUser(String userName) {
        User user = userMapper.getByUserName(userName);
        return user;
    }

    public void add(User user) {
        String userName = user.getUserName();
        String password = user.getPassword();

        // hashIterations shiro.xml 配置的密码迭代次数
        String password_cryto = PasswordUtil.customMd5Password(userName, password, 3);
        user.setPassword(password_cryto);

        userMapper.insertSelective(user);
    }
}
