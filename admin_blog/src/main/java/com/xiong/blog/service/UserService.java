package com.xiong.blog.service;

import com.xiong.blog.model.User;

import java.util.Map;

public interface UserService {
    User selectByUserName(Map<String, Object> map);

    int updateByPrimaryKeySelective(User record);
}
