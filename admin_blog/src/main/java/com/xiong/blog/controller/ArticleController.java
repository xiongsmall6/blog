package com.xiong.blog.controller;

import ch.qos.logback.core.util.FileUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xiong.blog.model.Article;
import com.xiong.blog.service.ArticleService;
import com.xiong.blog.vo.ResultBean;
import com.xiong.blog.vo.Uploader;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ArticleController {
    @Autowired
    private ArticleService articleService;


    @RequestMapping("/index")
    public Object index(ModelMap map,@ModelAttribute("pageNum") String pageNum) {
        Map<String,Object> params = new HashMap<>();
        if(!StringUtils.isEmpty(pageNum)){
            params.put("pageNum",Integer.parseInt(pageNum));
        }
        PageInfo<Article> articleList = articleService.selectArticles(params);
        map.addAttribute("pageInfo", articleList);
        return "index";
    }


    @RequestMapping("/article")
    public Object addArticle(ModelMap map,@RequestParam(value = "id", required = false) Integer id,
                             @RequestParam(value = "page", required = false) Integer pageNum) {
        Article article = articleService.selectByPrimaryKey(id);
        if(article==null){
            article = new Article();
            article.setType(1);
            article.setTop(0);
        }
        map.addAttribute("article", article);
        map.addAttribute("pageNum",pageNum);
        return "article";
    }

    @RequestMapping("/upload")
    @ResponseBody
    public Object upload(HttpServletRequest request) {
        MultipartFile file = ((MultipartRequest) request).getFile("file");
        if(file!=null&&!file.isEmpty()) {
            // 放在static下的原因是，存放的是静态文件资源，方便访问 正式环境应该存储到自己的文件服务系统里面
            String path = ClassUtils.getDefaultClassLoader().getResource("").getPath()+"static/cover/";
            try {
                String fileName = file.getOriginalFilename();
                fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
                File dest = new File(path+fileName);
                file.transferTo(dest); //保存文件
                return new ResultBean(200,"上传成功","cover/"+fileName);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResultBean(-1,"上传失败",null);
            }

        }else{
            return new ResultBean(-2,"缺少必填参数",null);
        }

    }

    @RequestMapping("/ueditor/upload")
    @ResponseBody
    public Object ueditorUpload(HttpServletRequest request) {
        MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
        MultiValueMap<String,MultipartFile> multiFileMap = mRequest.getMultiFileMap();
        List<MultipartFile> fileSet = new LinkedList<>();
        for(Map.Entry<String, List<MultipartFile>> temp : multiFileMap.entrySet()){
            fileSet = temp.getValue();
        }
        Uploader uploader = new Uploader();
        try {
            String abPath = ClassUtils.getDefaultClassLoader().getResource("").getPath()+"static/cover/";
            if(fileSet.size()>0){
                MultipartFile temp = fileSet.get(0);
                String originalFilename = temp.getOriginalFilename();
                long size = temp.getSize();
                String type = getFileExt(originalFilename);
                String fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + originalFilename;
                File dest = new File(abPath+fileName);
                temp.transferTo(dest);
                uploader = new Uploader("cover/"+fileName,fileName,"SUCCESS",type,originalFilename,size);
            }

        } catch (Exception e) {
            e.printStackTrace();
            uploader = new Uploader("","","未知错误","","",0);
        }
        return JSON.toJSONString(uploader);
    }

    @RequestMapping("/article/add")
    @ResponseBody
    public Object saveArticle(Article article) {
        if(StringUtils.isEmpty(article.getCreateUser())||StringUtils.isEmpty(article.getContent())
                ||StringUtils.isEmpty(article.getTitle())||StringUtils.isEmpty(article.getPicture())){
            return new ResultBean(-2,"参数异常",null);
        }
        int count = 0 ;
        if(article!=null){
            article.setCreateTime(new Date());
        }
        if(!StringUtils.isEmpty(article.getId())){
            count= articleService.updateByPrimaryKeySelective(article);
        }else{
            count = articleService.insert(article);
        }
        if(count>0){
            return new ResultBean(200,"保存成功",null);
        }else{
            return new ResultBean(-1,"保存失败",null);
        }
    }

    @RequestMapping("/article/list")
    @ResponseBody
    public Object listArticle(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize,
                              @RequestParam(value = "title", required = false) String title,
                              @RequestParam(value = "type", required = false) Integer type,
                              @RequestParam(value = "content", required = false) String content) {
        try{
            Map<String,Object> params = new HashMap<>();
            params.put("pageNum",pageNum);
            params.put("pageSize",pageSize);
            params.put("title",title);
            params.put("type",type);
            params.put("content",content);
            PageInfo<Article> articleList = articleService.selectArticles(params);
            return new ResultBean(200,"查询成功",articleList);
        }catch (Exception e){
            e.printStackTrace();
            return new ResultBean(-1,"查询失败",null);
        }
    }

    @RequestMapping("article/delete")
    public Object deleteArticle(ModelMap map, @RequestParam(value = "article_id", required = false) Integer id,
                        @RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        articleService.deleteByPrimaryKey(id);
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页 不希望浏览器地址中出现第几页
        return  "redirect:/index";
    }


    @RequestMapping("go/index")
    public Object goIndex(@RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页  不希望浏览器地址中出现第几页
        return  "redirect:/index";
    }

    private String getFileExt(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
}

