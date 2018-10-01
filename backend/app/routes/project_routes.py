from . import db_client
from .route_utils import success, error_response
from .formatters import project_formatter
from flask import Blueprint, request

project_blueprint = Blueprint('project', __name__)


@project_blueprint.route('/projects', methods=['GET', 'POST'])
def handle_project():
    if request.method == 'GET':
        return _get_projects()
    if request.method == 'POST':
        return _make_project()
    return error_response('Invalid Request')


def _get_projects():
    projects = db_client.get_projects()
    formatted_projects = project_formatter.format_projects(projects)
    return success(data=list(formatted_projects))


def _make_project():
    project_data = request.json
    db_client.save_project(project_data)
    return success(message='Successfully passed a JWT')


@project_blueprint.route(
    '/projects/<int:project_id>/transactions', methods=['GET'])
def get_project_transactions(project_id):
    transactions = db_client.get_project_transactions(project_id)
    return success(
        project_id=project_id,
        transactions=[txn.to_dict() for txn in transactions],
    )
