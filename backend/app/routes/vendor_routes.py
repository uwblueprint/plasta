from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from . import db_client
from .utils.route_utils import success

blueprint = Blueprint('vendor', __name__, url_prefix='/vendors')


@blueprint.route('/', methods=['GET'])
# @jwt_required
def get_all_vendors():
    return get_vendors([])


@blueprint.route('/<list:vendor_types>', methods=['GET'])
# @jwt_required
def get_vendors(vendor_types):
    vendors = db_client.get_vendors(vendor_types)
    return success(data=[vendor.to_dict() for vendor in vendors])


@blueprint.route('/<int:vendor_id>/transactions', methods=['GET'])
# @jwt_required
def get_vendor_transactions(vendor_id):
    transactions = db_client.get_vendor_transactions(vendor_id)
    return success(data=[
        transaction.to_dict(include_relationships=True)
        for transaction in transactions
    ])


@blueprint.route('/<int:vendor_id>/transactions', methods=['POST'])
# @jwt_required
def create_vendor_transaction(vendor_id):
    transaction_data = request.json
    transaction = db_client.create_transaction(transaction_data)
    return success(data=transaction.to_dict(include_relationships=True))


# TODO(imran): Only certain vendor types should have the power to create
# other vendor types. For example, primary segregators can only create other primary segregators.
# We should prevent vendors from creating other vendors inappropriately.
# This requires having a `current_user` object.
@blueprint.route('/', methods=['POST'])
@jwt_required
def create_vendor():
    data = request.json if request.headers['Content-Type'] == 'application/json' else request.form.to_dict()
    current_user = get_jwt_identity()
    vendor = db_client.create_vendor(
        data=data,
        current_user=current_user,
        files=request.files
    )
    return success(data=vendor.to_dict(include_relationships=True))


@blueprint.route('/primary_segregator/<int:primary_segregator_id>/wastepickers', methods=['GET'])
# @jwt_required
def get_primary_segregator_associated_wastepickers(primary_segregator_id):
    wastepicker_ids = db_client.get_primary_segregator_associated_wastepickers(primary_segregator_id)
    return success(data=wastepicker_ids)
