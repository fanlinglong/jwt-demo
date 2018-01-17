package com.videtek.jwt.demo.dao;

import com.videtek.jwt.demo.pojo.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User getByUserName(@Param("userName") String userName);

    User login(@Param("userName") String userName, @Param("password") String password);
}