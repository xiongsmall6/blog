package com.xiong.blog.vo;

import com.xiong.blog.model.Album;
import com.xiong.blog.model.AlbumDetail;

import java.util.List;

public class AlbumVo extends Album{
    private Integer pictures;
    private List<AlbumDetail> albumDetails;
    private String albumTypeStr;

    public Integer getPictures() {
        return pictures ==null?0:pictures;
    }

    public void setPictures(Integer pictures) {
        this.pictures = pictures;
    }

    public List<AlbumDetail> getAlbumDetails() {
        return albumDetails;
    }

    public void setAlbumDetails(List<AlbumDetail> albumDetails) {
        this.albumDetails = albumDetails;
    }

    public String getAlbumTypeStr() {
        return albumTypeStr;
    }

    public void setAlbumTypeStr(String albumTypeStr) {
        this.albumTypeStr = albumTypeStr;
    }
}