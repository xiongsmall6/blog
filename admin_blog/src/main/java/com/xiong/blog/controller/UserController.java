package com.xiong.blog.controller;

import com.xiong.blog.model.User;
import com.xiong.blog.service.UserService;
import com.xiong.blog.vo.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping("/user")
    public Object userIndex(){
        return "user";
    }

    @RequestMapping("/portrait/upload")
    @ResponseBody
    public Object upload(HttpServletRequest request) {
        MultipartFile file = ((MultipartRequest) request).getFile("file");
        if(request.getSession().getAttribute("user")==null){
            new ResultBean(-1,"上传失败",null);
        }
        User user = (User) request.getSession().getAttribute("user");
        if(file!=null&&!file.isEmpty()) {
            // 放在static下的原因是，存放的是静态文件资源，方便访问 正式环境应该存储到自己的文件服务系统里面
            String path = ClassUtils.getDefaultClassLoader().getResource("").getPath()+"static/cover/";
            try {
                String fileName = file.getOriginalFilename();
                fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_" + fileName;
                File dest = new File(path+fileName);
                file.transferTo(dest); //保存文件
                user.setPortrait("cover/"+fileName);
                userService.updateByPrimaryKeySelective(user);
                request.getSession().setAttribute("user",user);
                return new ResultBean(200,"上传成功","cover/"+fileName);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResultBean(-1,"上传失败",null);
            }
        }else{
            return new ResultBean(-2,"缺少必填参数",null);
        }

    }


    @RequestMapping("/update/user")
    @ResponseBody
    public Object updateUser(HttpServletRequest request,User user) {
        if(request.getSession().getAttribute("user")==null){
            new ResultBean(-1,"上传失败",null);
        }
        User currentUser = (User) request.getSession().getAttribute("user");
        user.setId(currentUser.getId());
        user.setPortrait(currentUser.getPortrait());
        userService.updateByPrimaryKeySelective(user);
        request.getSession().setAttribute("user",user);
        return new ResultBean(200,"更新成功",user);
    }
}
