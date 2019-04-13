package com.xiong.blog.dao;

import com.xiong.blog.model.Album;
import com.xiong.blog.vo.AlbumVo;

import java.util.List;
import java.util.Map;

public interface AlbumMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Album record);

    int insertSelective(Album record);

    Album selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Album record);

    int updateByPrimaryKey(Album record);

    List<AlbumVo> selectAlbumVos(Map<String,Object> map);

    AlbumVo selectVoByPrimaryKey(Integer id);


}