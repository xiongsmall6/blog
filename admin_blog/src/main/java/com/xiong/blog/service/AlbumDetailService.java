package com.xiong.blog.service;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Album;
import com.xiong.blog.model.AlbumDetail;
import com.xiong.blog.vo.AlbumVo;

import java.util.Map;

public interface AlbumDetailService {
    int insert(AlbumDetail record);
    int deleteByPrimaryKey(Integer id);
}