package com.xiong.blog.controller;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Article;
import com.xiong.blog.model.Whisper;
import com.xiong.blog.service.WhisperService;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.xml.ws.ResponseWrapper;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WhisperController {
    @Autowired
    private WhisperService whisperService;

    @RequestMapping("/whisper")
    public Object whisperIndex(ModelMap map,@ModelAttribute("pageNum") String pageNum){
        Map<String,Object> params = new HashMap<>();
        if(!StringUtils.isEmpty(pageNum)){
            params.put("pageNum",Integer.parseInt(pageNum));
        }
        PageInfo<WhisperVo> whisperList = whisperService.selectWhispers(params);
        map.addAttribute("pageInfo", whisperList);
        return "whisper";
    }

    @RequestMapping("/whisper/list")
    @ResponseBody
    public Object listWhisper(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize,
                              @RequestParam(value = "content", required = false) String content) {
        try{
            Map<String,Object> params = new HashMap<>();
            params.put("pageNum",pageNum);
            params.put("pageSize",pageSize);
            params.put("content",content);
            PageInfo<WhisperVo> whisperList = whisperService.selectWhispers(params);
            return new ResultBean(200,"查询成功",whisperList);
        }catch (Exception e){
            e.printStackTrace();
            return new ResultBean(-1,"查询失败",null);
        }
    }

    @RequestMapping("/whisper/add")
    public Object addArticle(ModelMap map,@RequestParam(value = "id", required = false) Integer id,
                             @RequestParam(value = "page", required = false) Integer pageNum) {
        Whisper whisper = whisperService.selectByPrimaryKey(id);
        if(whisper==null){
            whisper = new Whisper();
        }
        map.addAttribute("whisper", whisper);
        map.addAttribute("pageNum",pageNum);
        return "whisper_detail";
    }

    @RequestMapping("/add/whisper")
    @ResponseBody
    public Object saveArticle(Whisper whisper) {
        if(StringUtils.isEmpty(whisper.getCreateUser())||StringUtils.isEmpty(whisper.getContent())){
            return new ResultBean(-2,"参数异常",null);
        }
        int count = 0 ;
        if(whisper!=null){
            whisper.setCreateTime(new Date());
        }
        if(!StringUtils.isEmpty(whisper.getId())){
            count= whisperService.updateByPrimaryKeySelective(whisper);
        }else{
            whisper.setPraise(0);
            count = whisperService.insert(whisper);
        }
        if(count>0){
            return new ResultBean(200,"保存成功",null);
        }else{
            return new ResultBean(-1,"保存失败",null);
        }
    }

    @RequestMapping("whisper/delete")
    public Object deleteWhisper(ModelMap map, @RequestParam(value = "whisper_id", required = false) Integer id,
                        @RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        whisperService.deleteByPrimaryKey(id);
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页 不希望浏览器地址中出现第几页
        return  "redirect:/whisper";
    }


    @RequestMapping("go/whisper")
    public Object goWhisper(@RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页  不希望浏览器地址中出现第几页
        return  "redirect:/whisper";
    }
}
