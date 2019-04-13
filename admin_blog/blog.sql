/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2019-03-26 10:05:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `album`
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(128) DEFAULT NULL COMMENT '相册名称',
  `album_type`  int(11) DEFAULT NULL COMMENT '相册类型',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(32)  DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='相册';

-- ----------------------------
-- Records of album
-- ----------------------------

-- ----------------------------
-- Table structure for `album_detail`
-- ----------------------------
DROP TABLE IF EXISTS `album_detail`;
CREATE TABLE `album_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) DEFAULT NULL COMMENT '相册id',
  `img_url` varchar(128) DEFAULT NULL COMMENT '照片地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='相册详情表';

-- ----------------------------
-- Records of album_detail
-- ----------------------------

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext COMMENT '文章内容',
  `title` varchar(128) DEFAULT NULL COMMENT '标题',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(32) DEFAULT NULL COMMENT '创建人',
  `top` int(11) DEFAULT NULL COMMENT '是否置顶',
  `picture` varchar(128) DEFAULT NULL COMMENT '文章封面图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) DEFAULT NULL COMMENT '被评论内容id',
  `comment` varchar(256) DEFAULT NULL COMMENT '评论内容',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(32) DEFAULT NULL COMMENT '创建用户',
  `type` int(11) DEFAULT NULL  COMMENT '评论类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='文章评论表';

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(32)  DEFAULT NULL COMMENT '用户名',
  `password` varchar(32)  DEFAULT NULL COMMENT '密码',
  `full_name` varchar(32)  DEFAULT NULL COMMENT '姓名',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `phone` varchar(16) DEFAULT NULL COMMENT '电话',
  `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `motto` varchar(256) DEFAULT NULL COMMENT '座右铭',
  `occupation` varchar(64) DEFAULT NULL COMMENT '职业',
  `hobby` varchar(128) DEFAULT NULL COMMENT '爱好',
  `qq` varchar(16) DEFAULT NULL COMMENT 'qq号',
  `wechat` varchar(16)  DEFAULT NULL COMMENT '微信号',
  `portrait` varchar(256)  DEFAULT NULL COMMENT '头像',
  `wechat_code` varchar(128)  DEFAULT NULL COMMENT '微信二维码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='后台管理用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456', '管理员', '25', null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `whisper`
-- ----------------------------
DROP TABLE IF EXISTS `whisper`;
CREATE TABLE `whisper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(512) DEFAULT NULL COMMENT '内容',
  `pic1` varchar(128) DEFAULT NULL COMMENT '图片1',
  `pic2` varchar(128) DEFAULT NULL COMMENT '图片2',
  `pic3` varchar(128) DEFAULT NULL COMMENT '图片3',
  `praise` int(11) DEFAULT NULL COMMENT '点赞次数',
  `create_time` datetime DEFAULT NULL,
  `create_user` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='微语';

-- ----------------------------
-- Records of whisper
-- ----------------------------
