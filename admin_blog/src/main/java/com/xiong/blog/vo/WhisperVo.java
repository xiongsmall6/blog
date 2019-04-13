package com.xiong.blog.vo;

import com.xiong.blog.model.Whisper;

public class WhisperVo extends Whisper {
   private Integer commentCounts; //评论数

    public Integer getCommentCounts() {
        return commentCounts;
    }

    public void setCommentCounts(Integer commentCounts) {
        this.commentCounts = commentCounts;
    }
}