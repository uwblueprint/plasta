def _format_plastic_info(plastic_info):
    fields = ['transaction_id', 'plastic_type', 'quantity', 'price']
    plastic_info_dict = plastic_info.to_dict()
    return {field: plastic_info_dict[field] for field in fields}


def format_transaction(txn):
    fields = ['id', 'project_id', 'from_vendor_id', 'to_vendor_id',
              'to_acknowledged', 'price', 'sale_data', 'plastics',
              'creator_id', 'created_at']
    txn_dict = txn.to_dict()
    formatted = {}
    for field in fields:
        if field == 'plastics':
            formatted[field] = {_format_plastic_info(plastic_info)
                                for plastic_info in txn.plastics}
        else:
            formatted[field] = txn_dict[field]
    return formatted


def format_transactions(txns):
    return [format_transaction(txn) for txn in txns]
