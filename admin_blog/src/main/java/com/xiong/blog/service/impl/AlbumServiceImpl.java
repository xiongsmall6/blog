package com.xiong.blog.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xiong.blog.dao.AlbumMapper;
import com.xiong.blog.model.Album;
import com.xiong.blog.service.AlbumService;
import com.xiong.blog.vo.AlbumVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    private AlbumMapper albumMapper;
    @Override
    public int insert(Album record) {
        return albumMapper.insert(record);
    }

    @Override
    public PageInfo<AlbumVo> selectAlbumVos(Map<String, Object> map) {
        Integer pageNum = map.get("pageNum")==null?1:(Integer)map.get("pageNum") ;
        Integer pageSize = map.get("pageSize")==null?10:(Integer)map.get("pageSize") ;
        PageHelper.startPage(pageNum,pageSize);
        List<AlbumVo> albumVoList = albumMapper.selectAlbumVos(map);
        PageInfo<AlbumVo> info = new PageInfo<>(albumVoList);
        return info;
    }

    @Override
    public int updateByPrimaryKeySelective(Album record) {
        return albumMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return albumMapper.deleteByPrimaryKey(id);
    }

    @Override
    public AlbumVo selectVoByPrimaryKey(Integer id) {
        return albumMapper.selectVoByPrimaryKey(id);
    }
}
