import os
from .podio_client import api
from .podio_client.transport import TransportException


def create_podio_sourcing_client():
    return api.OAuthAppClient(
        os.environ['PODIO_CLIENT_NAME'],
        os.environ['PODIO_CLIENT_SECRET'],
        os.environ['PODIO_SOURCING_APP_ID'],
        os.environ['PODIO_SOURCING_APP_TOKEN']
    )


def create_podio_stakeholders_client():
    return api.OAuthAppClient(
        os.environ['PODIO_CLIENT_NAME'],
        os.environ['PODIO_CLIENT_SECRET'],
        os.environ['PODIO_STAKEHOLDERS_APP_ID'],
        os.environ['PODIO_STAKEHOLDERS_APP_TOKEN']
    )


# create a new entry in the podio sourcing table when a ps sell transaction happens
# parameter: transaction (type: Transaction in models/transaction.py)
def create_sourcing_item(transaction_data):
    # TODO(joyce): right now podio_purchase_from_id, project_id and material_type_category are all
    # hardcoded. There should be a mapping between the vendor id in this app and the item id
    # in the stakeholders/project apps and the plastic category enum in the podio app.
    podio_purchase_from_id = 1045698435  # should make use of transaction_data["from_vendor_id"]
    date_purchased = transaction_data["sale_date"] + " 00:00:00"
    podio_sourcing_project_id = 1045701763
    try:
        client = create_podio_sourcing_client()
    except TransportException as e:
        print("Failed to establish Podio sourcing client:")
        print(e)
        return
    for plastic in transaction_data["plastics"]:
        purchase_price_rs = plastic["price"]
        quantity_kg = plastic["quantity"]
        podio_material_type_category = 1  # should make use of plastic["plastic_type"]
        item = {
            'fields':
                [{'external_id': 'purchased-from', 'values': [{'value': podio_purchase_from_id}]},
                 {'external_id': 'date-purchased', 'values': [{'start': date_purchased}]},
                 {'external_id': 'material-type', 'values': [{'value': podio_material_type_category}]},
                 {'external_id': 'purchase-price-rs', 'values': [{'value': purchase_price_rs}]},
                 {'external_id': 'quantity-kg', 'values': [{'value': quantity_kg}]},
                 {'external_id': 'sourcing-for-po', 'values': [{'value': podio_sourcing_project_id}]}]}
        try:
            client.Item.create(int(os.environ['PODIO_SOURCING_APP_ID']), item)
        except TransportException as e:
            print("Failed to create Podio sourcing entry:")
            print(e)  # logerror


def get_visible_wholesalers(item_id):
    wholesaler_visibility_field_id = 185088491
    try:
        client = create_podio_stakeholders_client()
    except TransportException as e:
        print("Failed to establish Podio stakeholders client:")
        print(e)
        return

    # Get list of visible wholesalers 
    wholesaler_visibility = client.Item.get_field_value(item_id, wholesaler_visibility_field_id)
    visible_wholesalers = [];
    for val in wholesaler_visibility: 
        visible_wholesalers.append(val['value']['text'])

    # Get list of all wholesalers from Podio and filter by visible wholesalers
    wholesalers = client.Item.filter(int(os.environ['PODIO_STAKEHOLDERS_APP_ID']), {})
    matches = []
    for item in wholesalers['items']:
        if (visible_wholesalers.count(item['title']) > 0):
            # Format data to match PFC database
            data = {
                'created_at': item['created_on'],
                'id': item['item_id'],
                'name': item['title'],
                'vendor_subtype': 'export_wholesaler',
                'vendor_type': 'wholesaler',
            }
            matches.append(data)
    return matches
