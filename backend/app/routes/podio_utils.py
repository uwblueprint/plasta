import os
from .podio_client import api
from .podio_client.transport import TransportException


# map our plastic type to the plastic type item id in the podio master plastic type table.
ps_buy_plastic_type_map = {
    'clear_pet': 1057427095,
    'mixed_pet': 1081865225,
    'pugga': 1081865273,
    'kadak': 1081866049,
    'mixed_plastic_waste': 1081865127,
    'films': 1081866090
}

# map our plastic type to the plastic type enum defined in the podio sourcing table schema.
ps_sell_plastic_type_map = {
    'mixed_pet': 1,
    'pugga': 2
}


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


def create_podio_buy_transaction_client():
    return api.OAuthAppClient(
        os.environ['PODIO_CLIENT_NAME'],
        os.environ['PODIO_CLIENT_SECRET'],
        os.environ['PODIO_PS_BUY_APP_ID'],
        os.environ['PODIO_PS_BUY_APP_TOKEN']
    )


# create a new entry in the podio sourcing table when a ps sell transaction happens
# parameter: transaction (type: Transaction in models/transaction.py)
def create_sourcing_item(transaction_data):
    # TODO(joyce): right now podio_purchase_from_id, project_id and material_type_category are all
    # hardcoded. There should be a mapping between the vendor id in this app and the item id
    # in the stakeholders/project apps and the plastic category enum in the podio app.
    podio_purchase_from_id = 1045698435  # should make use of transaction_data["from_vendor_id"]
    date_purchased = transaction_data["sale_date"]
    podio_sourcing_project_id = 1045701763  # should make use of transaction_data["project_id"]
    try:
        client = create_podio_sourcing_client()
    except TransportException as e:
        print("Failed to establish Podio sourcing client:")
        print(e)
        return
    for plastic in transaction_data["plastics"]:
        purchase_price_rs = plastic["price"]
        quantity_kg = plastic["quantity"]
        plastic_type = plastic["plastic_type"]
        if not plastic_type in ps_sell_plastic_type_map:
            print("ERROR: Podio sourcing table does not support plastic type {}".format(plastic_type))
        else:
            podio_material_type_category = ps_sell_plastic_type_map[plastic_type]
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


# create a new entry in the buy transaction table when a ps buy transaction happens
# parameter: transaction (type: Transaction in models/transaction.py)
def create_buy_transaction_item(transaction_data):
    # TODO(joyce): right now podio_purchase_from_id, project_id and material_type_category are all
    # hardcoded. There should be a mapping between the vendor id in this app and the item id
    # in the stakeholders/project apps, the plastic category enum and plastic type item id in the
    # podio plastic type app (master), the project id and the item id in the podio pfc projects app.
    podio_purchase_from_id = 1079205608  # should make use of transaction_data["from_vendor_id"]
    podio_purchase_by_id = 1073122201  # should make use of transaction_data["to_vendor_id"]
    date_purchased = transaction_data["sale_date"]
    podio_buy_project_id = 1075917335  # should make use of transaction_data["project_id"]
    try:
        client = create_podio_buy_transaction_client()
    except TransportException as e:
        print("Failed to establish Podio sourcing client:")
        print(e)
        return
    for plastic in transaction_data["plastics"]:
        purchase_price_rs = plastic["price"]
        quantity_kg = plastic["quantity"]
        plastic_type = plastic["plastic_type"]
        if not plastic_type in ps_buy_plastic_type_map:
            print("ERROR: Podio buy transaction table does not support plastic type {}".format(plastic_type))
        else:
            podio_plastic_type = ps_buy_plastic_type_map[plastic_type]
            item = {
                'fields':
                    [{'external_id': 'purchased-from', 'values': [{'value': podio_purchase_from_id}]},
                     {'external_id': 'purchased-by', 'values': [{'value': podio_purchase_by_id}]},
                     {'external_id': 'date-purchased', 'values': [{'start': date_purchased}]},
                     {'external_id': 'price-rs', 'values': [{'value': purchase_price_rs}]},
                     {'external_id': 'quantity', 'values': [{'value': quantity_kg}]},
                     {'external_id': 'plastic-type-2', 'values': [{'value': podio_plastic_type}]},
                     {'external_id': 'pfc-project-3', 'values': [{'value': podio_buy_project_id}]}]}
            try:
                client.Item.create(int(os.environ['PODIO_PS_BUY_APP_ID']), item)
            except TransportException as e:
                print("Failed to create Podio buy transaction entry:")
                print(e)  # logerror


def create_stakeholder_item(data):
    try:
        client = create_podio_stakeholders_client()
    except TransportException as e:
        print("Failed to establish Podio stakeholders client:")
        print(e)
        return
    
    try:
        name = data['name']
        phone_number = data['meta_data']['phone_number']
        address = data['meta_data']['address']
        item = {
            'fields':
                [{'external_id': 'name', 'values': [{'value': name}]},
                 {'external_id': 'phone-number', 'values': [{'type': 'main', 'value': phone_number}]},
                 {'external_id': 'address', 'values': [{'value': address}]}]}
        client.Item.create(int(os.environ['PODIO_STAKEHOLDERS_APP_ID']), item)
    except TransportException as e:
        print("Failed to create Podio stakeholders entry:")
        print(e)


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
    

