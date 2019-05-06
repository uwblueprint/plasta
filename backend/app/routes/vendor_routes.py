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


@blueprint.route('/<int:vendor_id>/transactions/<int:transaction_id>', methods=['GET'])
@jwt_required
def get_vendor_transaction_by_id(vendor_id,transaction_id):
    transaction = db_client.get_transaction(transaction_id)
    return success(data=transaction.to_dict(include_relationships=True)
    )


@blueprint.route('/<int:vendor_id>/transactions', methods=['POST'])
@jwt_required
def create_vendor_transaction(vendor_id):
    is_application_json = request.headers['Content-Type'] == 'application/json'
    transaction_data = request.json if is_application_json else request.form.to_dict()
    if not is_application_json and 'plastics' in transaction_data:
        transaction_data['plastics'] = json.loads(transaction_data['plastics'])

    if request.files:
        file_path, file_name = save_file_to_temp(request.files)
        file_upload_response = podio_utils.upload_file(file_name, file_path)
        if file_upload_response:
            transaction_data["file_id"] = file_upload_response["file_id"]
    return "{'date':'hello'}"
    # create transaction in db
    transaction = db_client.create_transaction(transaction_data)

    if os.environ['ENABLE_PODIO'] == 'True':
        # podio integration
        if vendor_id == int(transaction_data['from_vendor_id']):
            # sell transaction
            podio_utils.create_sourcing_item(transaction_data)
        else:
            # buy transaction
            podio_utils.create_buy_transaction_item(transaction_data)

    return success(data=transaction.to_dict(include_relationships=True))


def save_file_to_temp(file_request):
    file_name = file_request['picture'].filename
    file_obj = file_request['picture']
    temp_upload_path = os.path.join(os.environ['TEMP_UPLOAD_PATH'], file_name)
    file_path = os.path.abspath(temp_upload_path)

    try:
        file_obj.save(file_path)
        if os.path.exists(file_path):
            return file_path, file_name
        else:
            return False
    except TransportException as e:
        print("Failed to upload the file")
        print(e)
        return


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

    if request.files:
        file_path, file_name = save_file_to_temp(request.files)
        file_upload_response = podio_utils.upload_file(file_name, file_path)

    vendor = db_client.create_vendor(
        data=data,
        current_user=current_user
    )
    # Create stakeholder in Podio
    if file_upload_response:
        data["file_id"] = file_upload_response["file_id"]
    created_item = podio_utils.create_stakeholder_item(data)
    if created_item and 'item_id' in created_item:
        try:
            os.remove(file_path)
        except TransportException as e:
            print("File can't be removed")
            print(e)
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
