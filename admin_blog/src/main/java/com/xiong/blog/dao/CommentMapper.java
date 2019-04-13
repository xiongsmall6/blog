package com.xiong.blog.dao;

import com.xiong.blog.model.Comment;
import com.xiong.blog.vo.WhisperVo;

import java.util.List;
import java.util.Map;

public interface CommentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKey(Comment record);

    List<Comment> selectComments(Map<String,Object> map);

    int deleteByIds(List list);
}