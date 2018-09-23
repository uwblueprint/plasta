from flask import Blueprint, jsonify, request
from app import db_client

project_blueprint = Blueprint('project', __name__)


@project_blueprint.route('/project', methods=['POST'])
def handle_project():
    if request.method == 'POST':
        return _make_project()
    return None


def _make_project():
    data = request.json
    db_client.save_project(data)
    return jsonify(success=True)
