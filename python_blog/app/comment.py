#!/user/bin/env python
# -*- coding: utf-8 -*-
from app import db
import datetime


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer)
    type = db.Column(db.Integer)
    comment = db.Column(db.String(256))
    create_user = db.Column(db.String(128))
    create_time = db.Column(db.DateTime(), default=datetime.datetime.now)

    def __init__(self, content_id, type, comment, create_user, create_time):
        self.content_id = content_id
        self.type = type
        self.comment = comment
        self.create_user = create_user
        self.create_time = create_time

    def insert(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def query_all_by_limit(content_id, type, page_index, page_size):
        return db.session.query(Comment).filter(Comment.content_id == content_id, Comment.type == type).\
            order_by(db.desc(Comment.create_time)).paginate(page=page_index, per_page=page_size)

    @staticmethod
    def query_all(content_id, type):
        return db.session.query(Comment).filter(Comment.content_id == content_id, Comment.type == type). \
            order_by(db.desc(Comment.create_time)).all()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'type': self.type,
            'comment': self.comment,
            'create_user': self.create_user,
            'create_time': dump_datetime(self.create_time)
        }


def dump_datetime(value):
    if value is None:
        return None
    return value.strftime("%Y-%m-%d %H:%M:%S")
