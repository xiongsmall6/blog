package com.xiong.blog.dao;

import com.xiong.blog.model.Article;

import java.util.List;
import java.util.Map;

public interface ArticleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Article record);

    int insertSelective(Article record);

    Article selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Article record);

    List<Article> selectArticles(Map<String,Object> map);

    Long selectArticleCount(Map<String,Object> map);

    int updateByPrimaryKey(Article record);
}