from ..models.project import Project
from ..models.transaction import Transaction
from ..models.user import User
from ..models.vendor import Vendor

from sqlalchemy import or_


# TODO(imran): write decorator to make db reads/writes atomic
def create_project(data):
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


def get_vendors(vendor_types):
    if not vendor_types:
        return Vendor.query.all()
    return Vendor.query.filter(Vendor.vendor_type.in_(vendor_types)).all()


def get_vendor_transactions(vendor_id):
    return Transaction.query.filter(
        or_(Transaction.from_vendor_id == vendor_id,
            Transaction.to_vendor_id == vendor_id)
    )
