METADATA_SPECS = {
    'project': {
        'brand_name': {
            'type': str,
            'required': True
        },
        'description': {
            'type': str,
            'required': False
        },
        'gdrive_link': {
            'type': str,
            'required': False
        },
        'project_terms': {
            'type': str,
            'required': True
        },
        'shipping_terms': {
            'type': str,
            'required': True
        },
        'cost_model': {
            'type': dict,
            'required': True,
            'specification': {
                'wastepicker_sell_price': {
                    'type': float,
                    'required': True
                },
                'wastepicker_purchase_price': {
                    'type': float,
                    'required': True
                },
                'wholesaler_sell_price': {
                    'type': float,
                    'required': True
                },
                'price_buoyancy': {
                    'type': float,
                    'required': True
                },
                'wholesaler_exworks_price': {
                    'type': float,
                    'required': True
                },
                'wholesaler_shipping_price': {
                    'type': float,
                    'required': True
                },
                'wholesaler_delivered_price': {
                    'type': float,
                    'required': True
                },
                'pfc_transaction_fee': {
                    'type': float,
                    'required': True
                },
            }
        },
    },
    'vendor': {
        'phone_number': {
            'type': str,
            'required': True
        },
        'phone_type': {
            'type': str,
            'required': False
        },
        'address': {
            'type': str,
            'required': True
        },
        'language': {
            'type': str,
            'required': False
        },
        'aadhaar_id': {
            'type': str,
            'required': False
        },
        'hd_member_id': {
            'type': str,
            'required': False
        },
    }
}
