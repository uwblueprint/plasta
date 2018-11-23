from flask import Blueprint, request

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


# TODO(imran): Only certain vendor types should have the power to create
# other vendor types. For example, DWCCs can only create other DWCCs.
# We should prevent vendors from creating other vendors inappropriately.
# This requires having a `current_user` object.
@blueprint.route('/', methods=['POST'])
def create_vendor():
    vendor = db_client.create_vendor(request.json)
    return success(data=vendor.to_dict(include_relationships=True))
