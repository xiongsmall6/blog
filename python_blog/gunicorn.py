#!/user/bin/env python
# -*- coding: utf-8 -*-

import multiprocessing

bind = '0.0.0.0:5017'
workers = multiprocessing.cpu_count() * 2 + 1
max_requests = 1000
worker_class = 'gevent'
timeout = 60
daemon = True
accesslog = 'logs/gunicorn_info.log'
errorlog = 'logs/gunicorn_error.log'