from ..models.models import Project, User, Transaction


def save_project(formatted_data):
    return Project.create(**formatted_data)


def get_project_transactions(project_id):
    return Transaction.get_by(project_id=project_id)


def get_user(email):
    return User.get_by(first=True, email=email)
