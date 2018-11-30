from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from . import db_client
from .utils.route_utils import success

blueprint = Blueprint('vendor', __name__, url_prefix='/vendors')


@blueprint.route('/', methods=['GET'])
def get_all_vendors():
    return get_vendors([])


@blueprint.route('/<list:vendor_types>', methods=['GET'])
def get_vendors(vendor_types):
    vendors = db_client.get_vendors(vendor_types)
    return success(data=[vendor.to_dict() for vendor in vendors])


@blueprint.route('/<int:vendor_id>/transactions', methods=['GET'])
def get_vendor_transactions(vendor_id):
    transactions = db_client.get_vendor_transactions(vendor_id)
    return success(data=[
        transaction.to_dict(include_relationships=True)
        for transaction in transactions
    ])


@blueprint.route('/<int:vendor_id>/transactions', methods=['POST'])
def create_vendor_transaction(vendor_id):
    transaction_data = request.json
    transaction = db_client.create_transaction(transaction_data)
    return success(data=transaction.to_dict(include_relationships=True))


# TODO(imran): Only certain vendor types should have the power to create
# other vendor types. For example, DWCCs can only create other DWCCs.
# We should prevent vendors from creating other vendors inappropriately.
# This requires having a `current_user` object.
@blueprint.route('/', methods=['POST'])
def create_vendor():
    current_user = get_jwt_identity()
    vendor = db_client.create_vendor(
        request.form,
        current_user=current_user,
        files=request.files
    )
    return success(data=vendor.to_dict(include_relationships=True))


@blueprint.route('/dwcc/<int:dwcc_id>/wastepickers', methods=['GET'])
def get_dwcc_associated_wastepickers(dwcc_id):
    wastepicker_ids = db_client.get_dwcc_associated_wastepickers(dwcc_id)
    return success(data=wastepicker_ids)
