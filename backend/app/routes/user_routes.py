from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from .utils.route_utils import success

blueprint = Blueprint('user', __name__, url_prefix='/user')


@blueprint.route('/current', methods=['GET'])
@jwt_required
def get_current_user():
    return success(data=get_jwt_identity())
