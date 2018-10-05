from datetime import timedelta

from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from app.routes.route_utils import error_response, success
from app import db_client

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return error_response("Request is not JSON")

    email = request.json.get('email', None)
    # password = request.json.get('password', None)

    if not db_client.get_user(email):
        return error_response("User cannot be found")

    validity_time = timedelta(days=7)
    access_token = create_access_token(identity=email, expires_delta=validity_time)
    return success(**{"access_token": access_token})
