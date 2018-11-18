from flask import Blueprint, request

from . import db_client
from .route_utils import success

blueprint = Blueprint('project', __name__, url_prefix='/projects')


@blueprint.route('/', methods=['GET'])
def get_projects():
    projects = db_client.get_projects()
    return success(data=[
        project.to_dict(include_relationships=True) for project in projects
    ])


@blueprint.route('/', methods=['POST'])
def create_project():
    project = db_client.create_project(request.json)
    return success(data=project.to_dict(include_relationships=True))


@blueprint.route('/<int:project_id>/transactions', methods=['GET'])
def get_project_transactions(project_id):
    transactions = db_client.get_project_transactions(project_id)
    return success(data=[
        transaction.to_dict(
            include_relationships=True) for transaction in transactions
    ])
