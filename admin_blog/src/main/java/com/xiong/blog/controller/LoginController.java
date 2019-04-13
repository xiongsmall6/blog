package com.xiong.blog.controller;

import com.xiong.blog.model.User;
import com.xiong.blog.service.UserService;
import com.xiong.blog.vo.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/")
    @ResponseBody
    public Object index() {
        return "success";
    }
    @RequestMapping("/logout")
    public Object loginOut() {
        return "login";
    }


    @RequestMapping("/pageError")
    public Object pageError() {
        return "error";
    }


    @RequestMapping("/login")
    @ResponseBody
    public Object login(HttpServletRequest request,
                       @RequestParam(value = "user_name", required = false) String userName,
                       @RequestParam(value = "password", required = false) String password) {
        Map<String,Object> map = new HashMap<>();
        map.put("userName",userName);
        map.put("password",password);
        User user = userService.selectByUserName(map);
        if(user == null){
            return new ResultBean(-1,"用户名密码错误",null);
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("user",user);
        }
        return new ResultBean(200,"登陆成功",user);
    }
}
