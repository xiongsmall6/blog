#!/user/bin/env python
# -*- coding: utf-8 -*-

"""
@File  : __init__.py
@Author: zhaoli2
@desc: 程序的工厂函数
"""
import os

from flask import Flask, current_app, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import InternalServerError, HTTPException

from config import Config

db = SQLAlchemy()


# 创建数据库
def db_init():
    db.create_all()


def global_exception_handler(e):
    exc = InternalServerError()
    exception = {
        'code': exc.code,
        'name': exc.name
    }
    current_app.logger.exception(e)
    return render_template('error.html', exception=exception), exc.code


def http_exception_handler(e):
    exception = {
        'code': e.code,
        'name': e.name
    }
    current_app.logger.exception(e)
    return render_template('error.html', exception=exception), e.code


# 程序的工厂函数
def create_app():
    static_url_path = None if Config.APP_NAME is None else '/{app_name}/static'.format(app_name=Config.APP_NAME)
    # 配置静态资源路径
    app = Flask(__name__, static_url_path=static_url_path)
    app.config.from_object(Config)
    # 程序创建并配置好之后，就可以通过调用init_app完成初始化过程
    Config.init_app(app)
    db.init_app(app)

    # 注册蓝本
    from .main import main as main_blueprint
    url_prefix = None if Config.APP_NAME is None else '/{app_name}'.format(app_name=Config.APP_NAME)
    app.register_blueprint(main_blueprint, url_prefix=url_prefix)

    # 注册全局异常处理
    app.register_error_handler(Exception, global_exception_handler)

    # 注册全局HTTP异常处理
    app.register_error_handler(HTTPException, http_exception_handler)

    return app
