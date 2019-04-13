package com.xiong.blog.service;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Album;
import com.xiong.blog.vo.AlbumVo;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface AlbumService {
    int insert(Album record);

    PageInfo<AlbumVo> selectAlbumVos(Map<String,Object> map);

    int updateByPrimaryKeySelective(Album record);

    int deleteByPrimaryKey(Integer id);

    AlbumVo selectVoByPrimaryKey(Integer id);
}