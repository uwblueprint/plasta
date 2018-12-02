from sqlalchemy import or_

from . import s3_client
from ..models.project import Project
from ..models.transaction import Transaction
from ..models.user import User
from ..models.vendor import DWCCWastepickerMap, Vendor


# TODO(imran): write decorator to make db reads/writes atomic
def create_project(data):
    plastics = data.pop('plastics', {})
    vendors = data.pop('vendors', [])

    project = Project.create(**data)
    project.create_plastics(plastics)
    project.link_vendors(vendors)

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


def create_vendor(data, current_user=None, files=None):
    print(data)
    if files is not None and 'picture' in files:
        image_link = s3_client.upload_user_image(files['picture'])
        data['image_link'] = image_link

    vendor = Vendor.create(**data)

    if current_user is not None \
            and current_user['vendor']['vendor_type'] == 'dwcc' \
            and vendor.vendor_type == 'wastepicker':
        DWCCWastepickerMap.create(
            dwcc_id=current_user['vendor_id'],
            wastepicker_id=vendor.id)
    return vendor


def get_vendors(vendor_types):
    if not vendor_types:
        return Vendor.query.all()
    return Vendor.query.filter(Vendor.vendor_type.in_(vendor_types)).all()


def get_vendor_transactions(vendor_id):
    return Transaction.query.filter(
        or_(Transaction.from_vendor_id == vendor_id,
            Transaction.to_vendor_id == vendor_id))


def get_dwcc_associated_wastepickers(dwcc_id):
    return [
        entry.wastepicker_id
        for entry in DWCCWastepickerMap.get_by(dwcc_id=dwcc_id)
    ]
