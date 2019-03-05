import os
import boto3


def init_app(app):
    from . import jwt_manager
    jwt_manager.jwt.init_app(app)

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

    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

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


def create_podio_sourcing_client():
    from .podio_client import api
    return api.OAuthAppClient(
        os.environ['PODIO_CLIENT_NAME'],
        os.environ['PODIO_CLIENT_SECRET'],
        os.environ['PODIO_SOURCING_APP_ID'],
        os.environ['PODIO_SOURCING_APP_TOKEN']
    )


def create_podio_stakeholders_client():
    from .podio_client import api
    return api.OAuthAppClient(
        os.environ['PODIO_CLIENT_NAME'],
        os.environ['PODIO_CLIENT_SECRET'],
        os.environ['PODIO_STAKEHOLDERS_APP_ID'],
        os.environ['PODIO_STAKEHOLDERS_APP_TOKEN']
    )


s3_resource = create_s3_resource()

# Create podio clients
# sourcing_podio_client = create_podio_sourcing_client()
# stakesholders_podio_client = create_podio_stakeholders_client()
