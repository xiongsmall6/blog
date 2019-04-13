#!/user/bin/env python
# -*- coding: utf-8 -*-
from app import db
import datetime
from config import Config


class Article(db.Model):
    __tablename__ = "article"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    title = db.Column(db.String(128))
    type = db.Column(db.Integer)
    top = db.Column(db.Integer)
    picture = db.Column(db.String(128))
    create_user = db.Column(db.String(128))
    create_time = db.Column(db.DateTime(), default=datetime.datetime.now)

    @staticmethod
    def query_all_by_limit(page_index, page_size, type):
        return db.session.query(Article).filter(Article.type == type).order_by(db.desc(Article.top) ,db.desc(Article.create_time)).paginate(page=page_index,per_page=page_size)

    @staticmethod
    def query_by_id(id):
        return db.session.query(Article).get(id)

    @staticmethod
    def query_all(type):
        return db.session.query(Article.id).filter(Article.type == type).order_by(db.desc(Article.top), db.desc(Article.create_time)).all()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'title': self.title,
            'type': self.type,
            'top': self.top,
            'picture': self.picture,
            'create_user': self.create_user,
            'create_time': dump_datetime(self.create_time)
        }


def dump_datetime(value):
    if value is None:
        return None
    return value.strftime("%Y-%m-%d %H:%M:%S")

