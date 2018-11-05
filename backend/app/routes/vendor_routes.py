from flask import Blueprint

from . import db_client
from .route_utils import success

blueprint = Blueprint('vendor', __name__, url_prefix='/vendors')


@blueprint.route('/<list:vendor_types>', methods=['GET'])
def get_vendors(vendor_types):
    vendors = db_client.get_vendors(vendor_types)
    return success(data=[vendor.to_dict() for vendor in vendors])
