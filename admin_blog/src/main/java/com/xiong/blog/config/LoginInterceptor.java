package com.xiong.blog.config;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)throws IOException {
        HttpSession session = request.getSession();

        //判断是否已有该用户登录的session
        if(session.getAttribute("user") !=null){
            return  true;
        }
        //跳转到登录页
        String url = "/blog/logout";
        response.sendRedirect(url);
        return false;
    }
}
