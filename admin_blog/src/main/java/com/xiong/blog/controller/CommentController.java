package com.xiong.blog.controller;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Comment;
import com.xiong.blog.service.CommentService;
import com.xiong.blog.vo.ResultBean;
import com.xiong.blog.vo.WhisperVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;

    @RequestMapping("/comment")
    public Object commentIndex(ModelMap map, @ModelAttribute("pageNum") String pageNum){
        Map<String,Object> params = new HashMap<>();
        params.put("type","1");
        PageInfo<Comment> commentList = commentService.selectComments(params);
        map.addAttribute("pageInfo", commentList);
        return "comment";
    }

    @RequestMapping("/comment/list")
    @ResponseBody
    public Object listComment(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize,
                              @RequestParam(value = "comment", required = false) String comment,
                              @RequestParam(value = "type", required = false) Integer type) {
        try{
            Map<String,Object> params = new HashMap<>();
            params.put("pageNum",pageNum);
            params.put("pageSize",pageSize);
            params.put("comment",comment);
            params.put("type",type);
            PageInfo<Comment> commentList = commentService.selectComments(params);
            return new ResultBean(200,"查询成功",commentList);
        }catch (Exception e){
            e.printStackTrace();
            return new ResultBean(-1,"查询失败",null);
        }
    }

    @RequestMapping("/comment/delete")
    @ResponseBody
    public Object deleteComment(@RequestParam(value = "ids", required = false) String ids) {
        try{
            if(!StringUtils.isEmpty(ids)&&ids!=""){
                String [] idarr = ids.split(",");
                commentService.deleteByIds(Arrays.asList(idarr));
            }
            return new ResultBean(200,"删除成功",null);
        }catch (Exception e){
            e.printStackTrace();
            return new ResultBean(-1,"查询失败",null);
        }
    }
}
