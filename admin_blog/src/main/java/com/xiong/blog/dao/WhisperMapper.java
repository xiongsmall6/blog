package com.xiong.blog.dao;

import com.xiong.blog.model.Whisper;
import com.xiong.blog.vo.WhisperVo;

import java.util.List;
import java.util.Map;

public interface WhisperMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Whisper record);

    int insertSelective(Whisper record);

    Whisper selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Whisper record);

    int updateByPrimaryKey(Whisper record);

    List<WhisperVo> selectWhispers(Map<String,Object> map);
}