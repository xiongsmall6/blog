package com.xiong.blog.dao;

import com.xiong.blog.model.AlbumDetail;

public interface AlbumDetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AlbumDetail record);

    int insertSelective(AlbumDetail record);

    AlbumDetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AlbumDetail record);

    int updateByPrimaryKey(AlbumDetail record);
}