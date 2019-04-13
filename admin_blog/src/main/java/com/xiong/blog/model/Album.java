package com.xiong.blog.model;

import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class Album {
    private Integer id;

    private String albumName;

    private Integer albumType;


    private Date createTime;

    private String createUser;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName == null ? null : albumName.trim();
    }

    public Integer getAlbumType() {
        return albumType;
    }

    public void setAlbumType(Integer albumType) {
        this.albumType = albumType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }
}