from sqlalchemy import or_

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
from ..models.blacklisted_auth_token import BlacklistedAuthToken
from ..models.project import Project
from ..models.transaction import Transaction
from ..models.user import User
from ..models.vendor import PrimarySegregatorWastepickerMap, Vendor
import json


def add_auth_token_to_blacklist(data):
    blacklisted_auth_token = BlacklistedAuthToken.create(**data)
    return blacklisted_auth_token


def get_blacklisted_auth_token(token):
    return BlacklistedAuthToken.get_by(first=True, token=token)


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


def create_transaction(data, files=None):
    # from . import s3_client
    # if files is not None and 'picture' in files:
    #     receipt_image_link = s3_client.upload_image(files['picture'])
    #     data['receipt_image_link'] = receipt_image_link
    plastics = data.pop('plastics')
    transaction = Transaction.create(**data)
    transaction.create_plastics(plastics)
    data['plastics'] = plastics
    data['id'] = transaction.id
    return transaction


def get_project_transactions(project_id):
    return Transaction.get_by(project_id=project_id)


def create_user(data):
    return User.create(**data)


def get_user(email):
    return User.get_by(first=True, email=email)


def create_vendor(data, current_user=None, files=None):
    # from . import s3_client
    # if files is not None and 'picture' in files:        
    #     image_link = s3_client.upload_image(files['picture'])
    #     data['image_link'] = image_link

    vendor = Vendor.create(**data)

    if current_user is not None \
            and current_user['vendor']['vendor_type'] == 'primary_segregator' \
            and vendor.vendor_type == 'wastepicker':
        PrimarySegregatorWastepickerMap.create(
            primary_segregator_id=current_user['vendor_id'],
            wastepicker_id=vendor.id)
    return vendor


def update_vendor_podio_item_id(vendor, podio_item_id):
    return Vendor.update(vendor, podio_master_id=podio_item_id)


def update_transaction_podio_item_id(transaction, podio_item_id):
    return Transaction.update(transaction, podio_item_id=podio_item_id)


def get_vendor(id):
    return Vendor.get(id)


def get_vendors(vendor_types):
    if not vendor_types:
        return Vendor.query.all()
    return Vendor.query.filter(Vendor.vendor_type.in_(vendor_types)).all()


def get_vendor_transactions(vendor_id):
    return Transaction.query.filter(
        or_(Transaction.from_vendor_id == vendor_id,
            Transaction.to_vendor_id == vendor_id))


def get_transaction(transaction_id):
    return Transaction.get_by(first=True, id=transaction_id)


def update_transaction(transaction_id, transaction_data):
    transaction = get_transaction(transaction_id)
    transaction = Transaction.update(
        transaction,
        to_vendor_id=transaction_data["to_vendor_id"],
        price=transaction_data["price"],
        sale_date=transaction_data["sale_date"],

    )
    plastics = json.loads(transaction_data.pop('plastics'))
    transaction.update_plastics(transaction, plastics)
    return transaction


def get_primary_segregator_associated_wastepickers(primary_segregator_id):
    return [
        entry.wastepicker_id
        for entry in PrimarySegregatorWastepickerMap.get_by(primary_segregator_id=primary_segregator_id)
    ]
