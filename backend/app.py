# pylint: disable=wrong-import-position
# pylint: disable=unused-import

import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

import models

@app.route('/')
def hello_world():
    return 'Hello from flask!'

if __name__ == '__main__':
    app.run()
