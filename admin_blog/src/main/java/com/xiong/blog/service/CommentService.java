package com.xiong.blog.service;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Comment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    int deleteByPrimaryKey(Integer id);

    PageInfo<Comment> selectComments(Map<String,Object> map);

    int deleteByIds(List list);
}
