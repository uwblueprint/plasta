from ..models.project import Project
from ..models.transaction import Transaction
from ..models.user import User
from ..models.vendor import Vendor


# TODO(imran): write decorator to make db reads/writes atomic
def create_project(data):
    # We use `data.pop()` to get the value and also remove it
    # from the dict. If it the key is not present, we raise a
    # KeyError (as expected).
    plastics = data.pop('plastics')
    project = Project.create(**data)
    project.create_plastics(plastics)

    return project


def get_projects():
    return Project.query.all()


def create_transaction(data):
    plastics = data.pop('plastics')
    transaction = Transaction.create(**data)
    transaction.create_plastics(plastics)
    return transaction


def get_project_transactions(project_id):
    return Transaction.get_by(project_id=project_id)


def create_user(data):
    return User.create(**data)


def get_user(email):
    return User.get_by(first=True, email=email)


# TODO(imran): Insert into DWCCWasterPickerMap appropriately
def create_vendor(data):
    return Vendor.create(**data)
