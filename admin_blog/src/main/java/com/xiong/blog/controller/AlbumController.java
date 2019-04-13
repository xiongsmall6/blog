package com.xiong.blog.controller;

import com.github.pagehelper.PageInfo;
import com.xiong.blog.constant.Constants;
import com.xiong.blog.model.Album;
import com.xiong.blog.model.AlbumDetail;
import com.xiong.blog.service.AlbumDetailService;
import com.xiong.blog.service.AlbumService;
import com.xiong.blog.vo.AlbumVo;
import com.xiong.blog.vo.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @Autowired
    private AlbumDetailService albumDetailService;


    @RequestMapping("/album")
    public Object index(ModelMap map,@ModelAttribute("pageNum") String pageNum) {
        Map<String,Object> params = new HashMap<>();
        if(!StringUtils.isEmpty(pageNum)){
            params.put("pageNum",Integer.parseInt(pageNum));
        }
        PageInfo<AlbumVo> albumVosList = albumService.selectAlbumVos(params);
        map.addAttribute("pageInfo", albumVosList);
        return "album";
    }


    @RequestMapping("/album/pictures")
    public Object albumPictures(ModelMap map,@RequestParam(value = "id", required = false) Integer albumId,
                             @RequestParam(value = "page", required = false) Integer pageNum) {
        AlbumVo vo = albumService.selectVoByPrimaryKey(albumId);
        if(vo!=null){
            vo.setAlbumTypeStr(Constants.AlbumType.getDesc(vo.getAlbumType()));
        }
        map.addAttribute("albumVo", vo);
        map.addAttribute("pageNum",pageNum);
        return "album_detail";
    }

    @RequestMapping("/album/add")
    @ResponseBody
    public Object albumAdd(@RequestParam(value = "albumName", required = false) String albumName,
                           @RequestParam(value = "albumType", required = false) Integer albumType,
                           @RequestParam(value = "albumId", required = false) Integer albumId,
                           String createUser) {
        if(StringUtils.isEmpty(albumName)||StringUtils.isEmpty(albumType)){
            return new ResultBean(-2,"缺少必填参数",null);
        }
        Album album = new Album();
        album.setAlbumName(albumName);
        album.setAlbumType(albumType);
        if(!StringUtils.isEmpty(albumId)){
            album.setId(albumId);
            int count = albumService.updateByPrimaryKeySelective(album);
            if(count>0){
                return new ResultBean(200,"更新成功",album);
            }else{
                return new ResultBean(-1,"更新失败",album);
            }
        }
        album.setCreateTime(new Date());
        album.setCreateUser(createUser);
        int count = albumService.insert(album);
        if(count>0){
            return new ResultBean(200,"保存成功",album);
        }
        return new ResultBean(-1,"保存失败",album);
    }

    @RequestMapping("/album/upload")
    @ResponseBody
    public Object albumUpload(HttpServletRequest request) {
        String albumId = request.getParameter("album_id");
        if(StringUtils.isEmpty(albumId)||albumId==""){
            return new ResultBean(-2,"缺少必填参数",null);
        }
        MultipartFile file = ((MultipartRequest) request).getFile("file");
        if(file!=null&&!file.isEmpty()) {
            // 放在static下的原因是，存放的是静态文件资源，方便访问 正式环境应该存储到自己的文件服务系统里面
            String path = ClassUtils.getDefaultClassLoader().getResource("").getPath()+"static/cover/";
            try {
                String fileName = file.getOriginalFilename();
                fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
                File dest = new File(path+fileName);
                file.transferTo(dest); //保存文件
                AlbumDetail albumDetail = new AlbumDetail();
                albumDetail.setAlbumId(Integer.parseInt(albumId));
                albumDetail.setImgUrl("cover/"+fileName);
                albumDetailService.insert(albumDetail);
                return new ResultBean(200,"上传成功",albumDetail);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResultBean(-1,"上传失败",null);
            }

        }else{
            return new ResultBean(-2,"缺少必填参数",null);
        }

    }



    @RequestMapping("/album/list")
    @ResponseBody
    public Object listAlbum(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize,
                              @RequestParam(value = "albumName", required = false) String albumName) {
        try{
            Map<String,Object> params = new HashMap<>();
            params.put("pageNum",pageNum);
            params.put("pageSize",pageSize);
            params.put("albumName",albumName);
            PageInfo<AlbumVo> albumVosList = albumService.selectAlbumVos(params);
            return new ResultBean(200,"查询成功",albumVosList);
        }catch (Exception e){
            e.printStackTrace();
            return new ResultBean(-1,"查询失败",null);
        }
    }

    @RequestMapping("album/delete")
    public Object deleteAlbum(ModelMap map, @RequestParam(value = "id", required = false) Integer id,
                        @RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        albumService.deleteByPrimaryKey(id);
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页 不希望浏览器地址中出现第几页
        return  "redirect:/album";
    }

    @RequestMapping("album/picture/delete")
    @ResponseBody
    public Object deleteAlbumDetail(@RequestParam(value = "detail_id", required = false) Integer id) {
        int count = albumDetailService.deleteByPrimaryKey(id);
        if(count>0){
            return new ResultBean(200,"删除成功",null);
        }else{
            return new ResultBean(-1,"删除失败",null);
        }
    }

    @RequestMapping("go/album")
    public Object goAlbum(@RequestParam(value = "page", required = false) Integer pageNum, RedirectAttributes attributes) {
        attributes.addFlashAttribute("pageNum",pageNum);//重定向post参数传递 保证删除时还停留在第几页  不希望浏览器地址中出现第几页
        return  "redirect:/album";
    }


}

