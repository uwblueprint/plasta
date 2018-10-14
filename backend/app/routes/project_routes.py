from . import db_client
from .route_utils import success
from flask import Blueprint, request

blueprint = Blueprint('project', __name__, url_prefix='/projects')


@blueprint.route('/', methods=['GET'])
def get_project():
    projects = db_client.get_projects()
    return success(data=[
        project.format(include_relationships=True) for project in projects
    ])


@blueprint.route('/', methods=['POST'])
def create_project():
    project_data = request.json
    project = db_client.create_project(project_data)
    return success(data=project.format(include_relationships=True))


@blueprint.route('/<int:project_id>/transactions', methods=['GET'])
def get_project_transactions(project_id):
    transactions = db_client.get_project_transactions(project_id)
    return success(data=[txn.format() for txn in transactions])
