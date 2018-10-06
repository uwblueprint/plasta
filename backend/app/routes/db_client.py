from ..models.models import Project, User


def save_project(formatted_data):
    new_project = Project(**formatted_data)
    new_project.save()


def get_user(email):
    user = User.query.filter(User.email == email).first()
    return user
