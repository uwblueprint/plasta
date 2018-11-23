from datetime import timedelta

from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from . import db_client
from .utils.route_utils import error_response, success

blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@blueprint.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = _authenticate_user(email, password)

    if not user:
        return error_response(message="The email or password is incorrect.")

    access_token = _create_access_token(user)

    return success(access_token=access_token, data=user.to_dict())


def _authenticate_user(email, password):
    user = db_client.get_user(email)
    if user is None:
        return None
    return user.authenticate(password)


def _create_access_token(user):
    validity_time = timedelta(days=7)
    return create_access_token(
        identity=user.email,
        expires_delta=validity_time,
    )
