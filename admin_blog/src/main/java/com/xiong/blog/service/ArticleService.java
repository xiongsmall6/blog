package com.xiong.blog.service;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Article;
import com.xiong.blog.model.User;

import java.util.List;
import java.util.Map;

public interface ArticleService {

    int insert(Article record);

    PageInfo<Article> selectArticles(Map<String,Object> map);

    Article selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Article record);

    int deleteByPrimaryKey(Integer id);
}
