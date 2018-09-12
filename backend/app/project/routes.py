from flask import Blueprint, jsonify, request
from app import db
from app.models import Project

project = Blueprint('project', __name__)


@project.route('/project', methods=['POST'])
def handle_project():
    if request.method == 'POST':
        return _make_project()
    return None


def _make_project():
    data = request.json
    new_project = Project(**data)
    db.session.add(new_project)
    db.session.commit()
    return jsonify(success=True)
