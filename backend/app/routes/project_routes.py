from flask import Blueprint, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from .route_utils import success
from . import db_client

project_blueprint = Blueprint('project', __name__)
CORS(project_blueprint)


@project_blueprint.route('/project', methods=['GET', 'POST'])
@jwt_required
def handle_project():
    if request.method == 'GET':
        return success(**{"msg": "Successfully passed a JWT"})
    if request.method == 'POST':
        return _make_project()
    return None


def _make_project():
    data = request.json
    db_client.save_project(data)
    return jsonify(success=True)
