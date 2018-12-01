import os
import boto3
from flask_jwt_extended import JWTManager

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


def create_s3_resource():
    return boto3.resource(
        's3',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        region_name=os.environ['AWS_REGION_NAME']
    )


s3_resource = create_s3_resource()
