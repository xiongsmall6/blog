package com.xiong.blog.service.impl;

import com.xiong.blog.dao.UserMapper;
import com.xiong.blog.model.User;
import com.xiong.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectByUserName(Map<String, Object> map) {
        return userMapper.selectByUserName(map);
    }

    @Override
    public int updateByPrimaryKeySelective(User record) {
        return userMapper.updateByPrimaryKeySelective(record);
    }
}
