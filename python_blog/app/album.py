#!/user/bin/env python
# -*- coding: utf-8 -*-
from app import db
import datetime


class Album(db.Model):
    __tablename__ = "album"
    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(128))
    album_type = db.Column(db.Integer)
    create_user = db.Column(db.String(128))
    create_time = db.Column(db.DateTime(), default=datetime.datetime.now)
    pictures = db.relationship('AlbumDetail', backref='detail', lazy='dynamic')

    @staticmethod
    def query_all_by_limit(page_index, page_size):
        return db.session.query(Album).order_by(db.desc(Album.create_time)).paginate(
            page=page_index, per_page=page_size)

    @staticmethod
    def query_second_limit(page_index, page_size):
        return db.session.query(Album).order_by(db.desc(Album.create_time)).limit(page_size).\
            offset(1+((page_index-1)*page_size)).all()  # 从第二个开始

    @property
    def serialize(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'album_type': self.album_type,
            'create_user': self.create_user,
            'create_time': dump_datetime(self.create_time),
            'pictures':  [i.serialize for i in self.pictures]
        }


class AlbumDetail(db.Model):
    __tablename__ = "album_detail"
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'))
    img_url = db.Column(db.String(128))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'img_url': self.img_url
        }


def dump_datetime(value):
    if value is None:
        return None
    return value.strftime("%Y/%m/%d")

