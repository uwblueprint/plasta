from app import db
from app.models import Project, User


def save_project(formatted_data):
    new_project = Project(**formatted_data)
    db.session.add(new_project)
    db.session.commit()


def get_user(email):
    user = User.query.filter(User.email == email).first()
    return user
