from flask import Blueprint, request

from .route_utils import success
from . import db_client

project_blueprint = Blueprint('project', __name__)


@project_blueprint.route('/project', methods=['GET', 'POST'])
def handle_project():
    if request.method == 'GET':
        return success(message='Successfully passed a JWT')
    if request.method == 'POST':
        return _make_project()
    return None


def _make_project():
    data = request.json
    db_client.save_project(data)
    return success(message='Successfully passed a JWT')


@project_blueprint.route(
    '/project/<int:project_id>/transactions', methods=['GET'])
def get_project_transactions(project_id):
    transactions = db_client.get_project_transactions(project_id)
    return success(
        project_id=project_id,
        transactions=[txn.to_dict() for txn in transactions],
    )
