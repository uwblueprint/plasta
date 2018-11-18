from flask import Blueprint

from . import db_client
from .route_utils import success

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
        transaction.to_dict(
            include_relationships=True) for transaction in transactions
    ])
