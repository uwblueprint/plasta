from . import db_client
from .route_utils import success
from .formatters import project_formatter, transaction_formatter
from flask import Blueprint, request

blueprint = Blueprint('project', __name__, url_prefix='/projects')


@blueprint.route('/', methods=['GET'])
def get_project():
    projects = db_client.get_projects()
    formatted_data = project_formatter.format_projects(projects)
    return success(data=formatted_data)


@blueprint.route('/', methods=['POST'])
def create_project():
    project_data = request.json
    project = db_client.create_project(project_data)
    formatted_data = project_formatter.format_project(project)
    return success(data=formatted_data)


@blueprint.route('/<int:project_id>/transactions', methods=['GET'])
def get_project_transactions(project_id):
    transactions = db_client.get_project_transactions(project_id)
    formatted_data = transaction_formatter.format_transactions(transactions)
    return success(data=formatted_data)
