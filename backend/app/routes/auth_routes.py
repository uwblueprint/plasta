from datetime import timedelta
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from .route_utils import error_response, success
from . import db_client

blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@blueprint.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return error_response(message="Request is not JSON")

    email = request.json.get('email', None)
    # password = request.json.get('password', None)

    if not db_client.get_user(email):
        return error_response(message="User cannot be found")

    validity_time = timedelta(days=7)
    access_token = create_access_token(
        identity=email,
        expires_delta=validity_time,
    )
    return success(access_token=access_token)
