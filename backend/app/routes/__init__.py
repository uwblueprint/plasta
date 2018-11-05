from flask_jwt_extended import JWTManager

jwt = JWTManager()


def init_app(app):
    jwt.init_app(app)

    from .converters import ListConverter

    app.url_map.converters['list'] = ListConverter

    from . import auth_routes
    from . import project_routes
    from . import vendor_routes

    from flask_cors import CORS

    CORS(project_routes.blueprint)

    app.register_blueprint(auth_routes.blueprint)
    app.register_blueprint(project_routes.blueprint)
    app.register_blueprint(vendor_routes.blueprint)
