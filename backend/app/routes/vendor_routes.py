from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
import json
import os

from . import db_client
from . import podio_utils
from .utils.route_utils import success
from ..models.vendor import vendor_subtype_map
from flask_cors import cross_origin
from .podio_client.transport import TransportException

blueprint = Blueprint('vendor', __name__, url_prefix='/vendors')

@blueprint.route('/', methods=['GET'])
@jwt_required
def get_all_vendors():
    visible_wholesalers = []
    if os.environ['ENABLE_PODIO'] == 'True':
        current_user = get_jwt_identity()
        item_id = db_client.get_vendor(current_user['id']).podio_master_id
        visible_wholesalers = podio_utils.get_visible_wholesalers(item_id)
    return success(data=json.loads(get_vendors([]).data)['data'] + visible_wholesalers)


@blueprint.route('/<list:vendor_types>', methods=['GET'])
@jwt_required
def get_vendors(vendor_types):
    vendors = db_client.get_vendors(vendor_types)
    return success(data=[vendor.to_dict() for vendor in vendors])


@blueprint.route('/<int:vendor_id>/transactions', methods=['GET'])
@jwt_required
def get_vendor_transactions(vendor_id):
    transactions = db_client.get_vendor_transactions(vendor_id)
    return success(data=[
        transaction.to_dict(include_relationships=True)
        for transaction in transactions
    ])


@blueprint.route('/<int:vendor_id>/transactions', methods=['POST'])
@jwt_required
def create_vendor_transaction(vendor_id):
    is_application_json = request.headers['Content-Type'] == 'application/json'
    transaction_data = request.json if is_application_json else request.form.to_dict()
    if not is_application_json and 'plastics' in transaction_data:
        transaction_data['plastics'] = json.loads(transaction_data['plastics'])

    # create transaction in db
    transaction = db_client.create_transaction(transaction_data, request.files)

    if os.environ['ENABLE_PODIO'] == 'True':
        # podio integration
        if vendor_id == int(transaction_data['from_vendor_id']):
            # sell transaction
            podio_utils.create_sourcing_item(transaction_data)
        else:
            # buy transaction
            podio_utils.create_buy_transaction_item(transaction_data)

    return success(data=transaction.to_dict(include_relationships=True))


# TODO(imran): Only certain vendor types should have the power to create
# other vendor types. For example, primary segregators can only create other primary segregators.
# We should prevent vendors from creating other vendors inappropriately.
# This requires having a `current_user` object.
@blueprint.route('/', methods=['POST'])
@jwt_required
@cross_origin()
def create_vendor():
    is_application_json = request.headers['Content-Type'] == 'application/json'
    data = request.json if is_application_json else request.form.to_dict()
    # If it's FormData, need to convert meta_data from string to json
    if not is_application_json and 'meta_data' in data:
        data['meta_data'] = json.loads(data['meta_data'])
    current_user = get_jwt_identity()
    files = request.files
    file_name = files['picture'].filename
    file_obj = files['picture']
    temp_upload_path = os.path.join(os.environ['TEMP_UPLOAD_PATH'], file_name)
    file_path = os.path.abspath(temp_upload_path)

    try:
        file_obj.save(file_path)
    except TransportException as e:
        print("Failed to upload the file")
        print(e)
        return

    file_upload_response = podio_utils.upload_file(file_name, file_path)

    vendor = db_client.create_vendor(
        data=data,
        current_user=current_user
    )
    # Create stakeholder in Podio
    data["file_id"] = file_upload_response["file_id"]
    itemI_id = podio_utils.create_stakeholder_item(data)

    return success(data=vendor.to_dict(include_relationships=True))


@blueprint.route('/primary_segregator/<int:primary_segregator_id>/wastepickers', methods=['GET'])
@jwt_required
def get_primary_segregator_associated_wastepickers(primary_segregator_id):
    wastepicker_ids = db_client.get_primary_segregator_associated_wastepickers(
        primary_segregator_id)
    return success(data=wastepicker_ids)


@blueprint.route('/wastepicker_types', methods=['GET'])
@jwt_required
def get_wastepicker_types():
    wastepicker_types = []
    for vendor_subtype, vendor_type in vendor_subtype_map.items():
        if (vendor_type == 'wastepicker'):
            wastepicker_types.append({'value': vendor_subtype})
    return success(data=wastepicker_types)
