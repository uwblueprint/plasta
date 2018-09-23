from app import db
from app.models import Project


def save_project(formatted_data):
    new_project = Project(**formatted_data)
    db.session.add(new_project)
    db.session.commit()
