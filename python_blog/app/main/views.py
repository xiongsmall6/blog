#!/user/bin/env python
# -*- coding: utf-8 -*-
from app.main import main as ma
from flask import render_template, current_app, request, jsonify, session, redirect
from app.article import Article
from app.comment import Comment
from app.whisper import Whisper
from app.album import Album
from app.user import User
import time
import datetime


@ma.before_request
def is_login():
    # 首页不拦截
    if request.path == "/blog/":
        return None
    if not session.get("user"):
        # 重定向到首页
        request.values.get('id')
        return redirect("/blog/")


@ma.route('/', methods=['GET', 'POST'])
def index():
    user = User.query_all_by_user_name("admin")
    session["user"] = user.serialize
    if session.get('create_user') is None:
        session['create_user'] = '游客' + str(int(time.time()))
    page = request.values.get('page')
    type = request.values.get('type')
    if page is None:
        page = 1
    if type is None:
        type = 1
    page = int(page)
    type = int(type)
    paginate = Article.query_all_by_limit(page, 5, type)
    paginate.items = [i.serialize for i in paginate.items]
    return render_template("main/index.html", data=paginate, type=type, user=user.serialize)


@ma.route('/details', methods=['GET', 'POST'])
def details():
    id = request.values.get('id')
    type = request.values.get('type')
    article = Article.query_by_id(id)
    article_ids = Article.query_all(article.type)  # 获取同一类型的所有文章的id
    current_index = article_ids.index((int(id),))  # 当前文章的位置
    prev_id = -1
    next_id = -1
    if current_index > 0:
        prev_id = article_ids[current_index - 1][0]
    if current_index < len(article_ids)-1:
        next_id = article_ids[current_index + 1][0]
    details = {}
    paginate = Comment.query_all_by_limit(id, 1, 1, 5)
    details['prev_id'] = prev_id
    details['next_id'] = next_id
    details['article'] = article
    details['comment'] = paginate
    user = session.get('user')
    return render_template("main/details.html", details=details,user=user)


@ma.route('/listComment', methods=['GET', 'POST'])
def list_comment():
    content_id = request.values.get('content_id')
    page = request.values.get('page')
    page = int(page)
    paginate = Comment.query_all_by_limit(content_id, 1, page, 5)
    comments = [i.serialize for i in paginate.items]
    return current_app.make_response(jsonify(comments))


@ma.route('/addComment', methods=['GET', 'POST'])
def add_comment():
    content_id = request.values.get('content_id')
    comment_str = request.values.get('comment')
    type = request.values.get('type')
    create_user = session.get('create_user')
    com = Comment(content_id, type, comment_str, create_user, datetime.datetime.now())
    com.insert()
    paginate = Comment.query_all_by_limit(content_id, type, 1, 5)
    comments = [i.serialize for i in paginate.items]
    return current_app.make_response(jsonify({"data": comments, "total": paginate.total}))


@ma.route('/whisper', methods=['GET', 'POST'])
def whisper():
    page = request.values.get('page')
    if page is None:
        page = 1
    page = int(page)
    data = Whisper.query_all_and_comment(page, 5)
    user = session.get('user')
    return render_template("main/whisper.html", data=data, user=user)


@ma.route('/whisperComment', methods=['GET', 'POST'])
def whisper_comment():
    content_id = request.values.get('content_id')
    comments = Comment.query_all(content_id, 2)
    comments = [i.serialize for i in comments]
    return current_app.make_response(jsonify(comments))


@ma.route('/praise', methods=['GET', 'POST'])
def praise():
    content_id = request.values.get('content_id')
    tips = int(request.values.get('tips'))
    Whisper.update_praise_by_id(content_id, tips)
    return current_app.make_response(jsonify({"code": 200}))


@ma.route('/album', methods=['GET', 'POST'])
def album():
    data = Album.query_all_by_limit(1, 10)
    albums = [i.serialize for i in data.items]
    user = session.get('user')
    return render_template("main/album.html", data=albums, total=data.total, user=user)


@ma.route('/albumList', methods=['GET', 'POST'])
def album_list():
    page = request.values.get('page')
    if page is None:
        page = 1
    page = int(page)
    data = Album.query_second_limit(page, 9)
    albums = [i.serialize for i in data]
    return current_app.make_response(jsonify(albums))


@ma.route('/about', methods=['GET', 'POST'])
def about():
    user = session.get('user')
    return render_template("main/about.html", user=user)

