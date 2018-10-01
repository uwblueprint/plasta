from ..models.models import Project, User, Transaction


def save_project(data):
    return Project.create(**data)


def get_projects():
    return Project.query.all()


def get_project_transactions(project_id):
    return Transaction.get_by(project_id=project_id)


def get_user(email):
    return User.get_by(first=True, email=email)
