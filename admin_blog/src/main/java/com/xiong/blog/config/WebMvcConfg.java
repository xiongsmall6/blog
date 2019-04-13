package com.xiong.blog.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.*;


@Configuration
public class WebMvcConfg implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration addInterceptor = registry.addInterceptor(new LoginInterceptor());
        addInterceptor.excludePathPatterns("/logout");
        addInterceptor.excludePathPatterns("/login");
        addInterceptor.excludePathPatterns("/pageError");
        addInterceptor.excludePathPatterns("/css/**");
        addInterceptor.excludePathPatterns("/js/**");
        addInterceptor.excludePathPatterns("/imgs/**");
        addInterceptor.excludePathPatterns("/cover/**");
        //拦截配置
        addInterceptor.addPathPatterns("/**");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

}