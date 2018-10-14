from ..models.models import Project, User, Transaction, ProjectPlasticMap


# TODO(imran): write decorator to make db reads/writes atomic
def create_project(data):
    # We use `data.pop()` to get the value and also remove it
    # from the dict. If it the key is not present, we raise a
    # KeyError (as expected).
    plastics = data.pop('plastics')
    project = Project.create(**data)

    for plastic_info in plastics:
        plastic_type = plastic_info['plastic_type']
        quantity = plastic_info['quantity']

        # We should probably try/except this, but later.
        ProjectPlasticMap.create(
            project_id=project.id,
            plastic_type=plastic_type,
            quantity=quantity)
    return project


def get_projects():
    return Project.query.all()


def get_project_transactions(project_id):
    return Transaction.get_by(project_id=project_id)


def get_user(email):
    return User.get_by(first=True, email=email)
