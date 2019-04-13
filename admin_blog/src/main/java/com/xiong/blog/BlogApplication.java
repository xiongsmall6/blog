package com.xiong.blog;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;


@SpringBootApplication
@MapperScan("com.xiong.blog.dao") //扫描的mapper
public class BlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args);
    }


    @Component
    public class ErrorConfig implements ErrorPageRegistrar {

        @Override
        public void registerErrorPages(ErrorPageRegistry registry) {
            ErrorPage error400Page = new ErrorPage(HttpStatus.BAD_REQUEST, "/error");
            ErrorPage error401Page = new ErrorPage(HttpStatus.UNAUTHORIZED, "/error");
            ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/error");
            ErrorPage error500Page = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error");
            registry.addErrorPages(error400Page,error401Page,error404Page,error500Page);
        }
    }

}
