package com.xiong.blog.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xiong.blog.dao.CommentMapper;
import com.xiong.blog.model.Comment;
import com.xiong.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return commentMapper.deleteByPrimaryKey(id);
    }

    @Override
    public PageInfo<Comment> selectComments(Map<String, Object> map) {
        Integer pageNum = map.get("pageNum")==null?1:(Integer)map.get("pageNum") ;
        Integer pageSize = map.get("pageSize")==null?10:(Integer)map.get("pageSize") ;
        PageHelper.startPage(pageNum,pageSize);
        List<Comment> commentList =  commentMapper.selectComments(map);
        PageInfo<Comment> info = new PageInfo<>(commentList);
        return info;
    }

    @Override
    public int deleteByIds(List list) {
        return commentMapper.deleteByIds(list);
    }
}
