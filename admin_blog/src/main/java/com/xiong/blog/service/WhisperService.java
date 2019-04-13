package com.xiong.blog.service;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.User;
import com.xiong.blog.model.Whisper;
import com.xiong.blog.vo.WhisperVo;

import java.util.List;
import java.util.Map;

public interface WhisperService {
    PageInfo<WhisperVo> selectWhispers(Map<String,Object> map);

    int deleteByPrimaryKey(Integer id);

    int insert(Whisper record);

    Whisper selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Whisper record);
}
