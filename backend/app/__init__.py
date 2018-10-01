import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'

db = SQLAlchemy(app=app)
migrate = Migrate(app=app, db=db)

jwt = JWTManager(app)

#pylint: disable=wrong-import-position
from app.routes.auth_routes import auth_blueprint
from app.routes.project_routes import project_blueprint

app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
