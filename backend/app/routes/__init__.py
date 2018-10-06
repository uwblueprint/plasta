from flask_jwt_extended import JWTManager

jwt = JWTManager()


def init_app(app):
    jwt.init_app(app)

    from .auth_routes import auth_blueprint
    from .project_routes import project_blueprint

    from flask_cors import CORS

    CORS(project_blueprint)

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(project_blueprint)
