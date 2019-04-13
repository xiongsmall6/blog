#!/usr/bin/evn python
# -*- coding:utf-8 -*-
from app import db
import datetime
from flask import current_app
from sqlalchemy.exc import SQLAlchemyError
import math
from sqlalchemy import text


class Whisper(db.Model):
    __tablename__ = "whisper"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(512))
    pic1 = db.Column(db.String(128))
    pic2 = db.Column(db.String(128))
    pic3 = db.Column(db.String(128))
    praise = db.Column(db.Integer)
    create_user = db.Column(db.String(128))
    create_time = db.Column(db.DateTime(), default=datetime.datetime.now)

    @staticmethod
    def query_all_by_limit(page_index, page_size):
        return db.session.query(Whisper).order_by(db.desc(Whisper.create_time))\
            .paginate(page=page_index, per_page=page_size)

    @staticmethod
    def query_all_and_comment(page, limit):
        data = {}
        offset = (page - 1) * limit
        count = Whisper.query.count()
        data['page'] = page
        data['limit'] = limit
        data['total'] = math.ceil(count / limit)
        data['records'] = count
        select_params_dict = {
            'offset': offset,
            'limit': limit
        }
        sql = "select w.id, w.content,w.pic1 ,w.pic2,w.pic3 ,w.praise ,w.create_user ," \
              "DATE_FORMAT(w.create_time,'%Y/%m/%d') create_time,DATE_FORMAT(w.create_time,'%H:%i') create_data_time," \
              "(select count(c.id) from `comment` c where w.id = c.content_id and c.type = 2 ) comment_count" \
              " from whisper w order by w.create_time limit :limit offset :offset "
        bind_sql = text(sql)
        resproxy = db.session.connection().execute(bind_sql, select_params_dict)
        groups = resproxy.fetchall()
        rows = []
        if groups:
            for tuple_group in groups:
                rows.append({"id": tuple_group[0], "content": tuple_group[1], "pic1": tuple_group[2],
                             "pic2": tuple_group[3], "pic3": tuple_group[4], "praise": tuple_group[5],
                             "create_user": tuple_group[6], "create_time": tuple_group[7],
                             "create_data_time": tuple_group[8], "comment_count": tuple_group[9]
                             })
        data['rows'] = rows
        return data

    @staticmethod
    def update_praise_by_id(id,sub_or_add):
        record = db.session.query(Whisper).get(id)
        if record:
            try:
                if sub_or_add:
                    record.praise = record.praise+1
                else:
                    if record.praise > 0:
                        record.praise = record.praise - 1
                db.session.commit()
            except SQLAlchemyError as e:
                current_app.logger.exception('update record error: %s', id)
                raise e

    @property
    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'pic1': self.pic1,
            'pic2': self.pic2,
            'pic3': self.pic3,
            'create_user': self.create_user,
            'create_time_hour': dump_date_hour_time(self.create_time),
            'create_time': dump_date_time(self.create_time)
        }


def dump_date_hour_time(value):
    if value is None:
        return None
    return value.strftime("%H:%M:%S")


def dump_date_time(value):
    if value is None:
        return None
    return value.strftime("%Y-%m-%d")
