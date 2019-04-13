#!/user/bin/env python
# -*- coding: utf-8 -*-


import os
from app import create_app
from flask_script import Manager

import pymysql
pymysql.install_as_MySQLdb()

app = create_app()
manager = Manager(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5017)


# 启动单元测试命令
# @manager.command
# def test():
#     """Run the unit tests."""
#     import unittest
#     tests = unittest.TestLoader().discover('tests')
#     unittest.TextTestRunner(verbosity=2).run(tests)
