from datetime import timedelta

from flask import Blueprint, request
from flask_jwt_extended import create_access_token, get_raw_jwt, jwt_required

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

    # TODO(joyce): add access_token length check. Right now db column is restricted
    # to 2047 characters max.
    access_token = _create_access_token(user)

    return success(access_token=access_token, data=user.to_dict())


# Endpoint for revoking the current users access token
@blueprint.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    new_blacklist_token = db_client.add_auth_token_to_blacklist({"token": jti})
    if new_blacklist_token is None:
        return error_response(message="Unable to blacklist token upon logout.")
    return success()


def _authenticate_user(email, password):
    user = db_client.get_user(email)
    if user is None:
        return None
    return user.authenticate(password)


def _create_access_token(user):
    validity_time = timedelta(days=7)
    return create_access_token(
        identity=user.to_dict(),
        expires_delta=validity_time,
    )
