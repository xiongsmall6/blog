package com.xiong.blog.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xiong.blog.dao.WhisperMapper;
import com.xiong.blog.model.Whisper;
import com.xiong.blog.service.WhisperService;
import com.xiong.blog.vo.WhisperVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WhisperServiceImpl implements WhisperService {
    @Autowired
    private WhisperMapper whisperMapper;
    @Override
    public PageInfo<WhisperVo> selectWhispers(Map<String, Object> map) {
        Integer pageNum = map.get("pageNum")==null?1:(Integer)map.get("pageNum") ;
        Integer pageSize = map.get("pageSize")==null?10:(Integer)map.get("pageSize") ;
        PageHelper.startPage(pageNum,pageSize);
        List<WhisperVo> articleList = whisperMapper.selectWhispers(map);
        PageInfo<WhisperVo> info = new PageInfo<>(articleList);
        return info;
    }

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return whisperMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Whisper record) {
        return whisperMapper.insert(record);
    }

    @Override
    public Whisper selectByPrimaryKey(Integer id) {
        return whisperMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Whisper record) {
        return whisperMapper.updateByPrimaryKeySelective(record);
    }
}
