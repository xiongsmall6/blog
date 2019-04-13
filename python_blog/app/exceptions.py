#!/user/bin/env python
# -*- coding: utf-8 -*-


from werkzeug.exceptions import Unauthorized, InternalServerError, BadRequest


class BadRequestException(BadRequest):
    """
    错误的请求异常
    """

    def __init__(self, code=40000, message='Bad Request'):
        self.detail_code = code
        self.detail_message = message

    def __str__(self):
        return '{}: {}'.format(self.detail_code, self.detail_message)


class InternalServerException(InternalServerError):
    """
    内部服务器异常
    """

    def __init__(self, code=50000, message='Internal Server Error'):
        self.detail_code = code
        self.detail_message = message

    def __str__(self):
        return '{}: {}'.format(self.detail_code, self.detail_message)
