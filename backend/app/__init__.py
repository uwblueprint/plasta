import os

from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret'
    app.url_map.strict_slashes = False

    from . import routes, models
    routes.init_app(app)
    models.init_app(app)

    return app
