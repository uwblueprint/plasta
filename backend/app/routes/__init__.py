import boto3
from flask_jwt_extended import JWTManager

s3_resource = boto3.resource('s3')
jwt = JWTManager()


def init_app(app):
    jwt.init_app(app)

    from .utils.converters import ListConverter

    app.url_map.converters['list'] = ListConverter

    from . import auth_routes
    from . import project_routes
    from . import user_routes
    from . import vendor_routes

    from flask_cors import CORS

    CORS(auth_routes.blueprint)
    CORS(project_routes.blueprint)
    CORS(user_routes.blueprint)
    CORS(vendor_routes.blueprint)

    app.register_blueprint(auth_routes.blueprint)
    app.register_blueprint(project_routes.blueprint)
    app.register_blueprint(user_routes.blueprint)
    app.register_blueprint(vendor_routes.blueprint)
