#!/user/bin/env python
# -*- coding: utf-8 -*-
from app import db


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32))
    full_name = db.Column(db.String(32))
    age = db.Column(db.Integer)
    phone = db.Column(db.String(16))
    email = db.Column(db.String(32))
    motto = db.Column(db.String(256))
    occupation = db.Column(db.String(64))
    hobby = db.Column(db.String(128))
    qq = db.Column(db.String(16))
    wechat = db.Column(db.String(16))
    portrait = db.Column(db.String(256))
    wechat_code = db.Column(db.String(256))

    @staticmethod
    def query_all_by_user_name(user_name):
        return db.session.query(User).filter(User.user_name == user_name).first()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'full_name': self.full_name,
            'age': self.age,
            'phone': self.phone,
            'email': self.email,
            'motto': self.motto,
            'occupation': self.occupation,
            'hobby': self.hobby,
            'qq': self.qq,
            'wechat': self.wechat,
            'portrait': self.portrait,
            'wechat_code': self.wechat_code
        }
