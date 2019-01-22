METADATA_SPECS = {
    'project': {
        'brand_name': {
            'type': str,
            'required': False
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
            'required': False
        },
        'shipping_terms': {
            'type': str,
            'required': False
        },
        'cost_model': {
            'type': dict,
            'required': True,
            'specification': {
                'wastepicker_sell_price': {
                    'type': float,
                    'required': False
                },
                'wastepicker_purchase_price': {
                    'type': float,
                    'required': False
                },
                'wholesaler_sell_price': {
                    'type': float,
                    'required': False
                },
                'price_buoyancy': {
                    'type': float,
                    'required': False
                },
                'wholesaler_exworks_price': {
                    'type': float,
                    'required': False
                },
                'wholesaler_shipping_price': {
                    'type': float,
                    'required': False
                },
                'wholesaler_delivered_price': {
                    'type': float,
                    'required': False
                },
                'pfc_transaction_fee': {
                    'type': float,
                    'required': False
                },
            }
        },
    },
    'vendor': {
        'phone_number': {
            'type': str,
            'required': False
        },
        'phone_type': {
            'type': str,
            'required': False
        },
        'address': {
            'type': str,
            'required': False
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
