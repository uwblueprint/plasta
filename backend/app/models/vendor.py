from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin

vendor_type_enum = db.Enum(
    'admin',
    'wastepicker',
    'primary_segregator',
    'wholesaler',
    'manufacturer',
    name='vendor_type')

vendor_subtype_enum = db.Enum(
    'wastepicker',
    'home_based_worker',
    'itinerant_buyer',
    'wp_community_leader',
    'door_to_door_collection',
    'pourakarmikas',
    'scrap_shop',
    'van_unit',
    'primary_segregator',
    'wholesaler',
    'export_wholesaler',
    'franchisee_partner',
    'processor',
    'brand',
    'admin',
    'external_dwcc',
    'external_scrap_shop',
    name='vendor_subtype')

vendor_subtype_map = {
    'admin': 'admin',
    'wastepicker': 'wastepicker',
    'home_based_worker': 'wastepicker',
    'itinerant_buyer': 'wastepicker',
    'wp_community_leader': 'wastepicker',
    'door_to_door_collection': 'wastepicker',
    'pourakarmikas': 'wastepicker',
    'external_dwcc': 'wastepicker',
    'external_scrap_shop': 'wastepicker',
    'scrap_shop': 'primary_segregator',
    'van_unit': 'primary_segregator',
    'primary_segregator': 'primary_segregator',
    'wholesaler': 'wholesaler',
    'export_wholesaler': 'wholesaler',
    'franchisee_partner': 'wholesaler',
    'processor': 'manufacturer',
    'brand': 'manufacturer',
}


class Vendor(BaseMixin, db.Model):
    __tablename__ = 'vendor'
    id = db.Column(db.Integer, primary_key=True)
    vendor_type = db.Column(vendor_type_enum, nullable=False)
    vendor_subtype = db.Column(vendor_subtype_enum, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image_link = db.Column(db.String(255), nullable=True)
    meta_data = db.Column(JSONB)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    podio_master_id = db.Column(db.Integer, nullable=True)

    @classmethod
    def create(cls, **kwargs):
        # Override the `create` method to enforce that `vendor_type` is
        # the proper parent of `vendor_subtype`.
        subtype = kwargs['vendor_subtype']
        kwargs['vendor_type'] = vendor_subtype_map[subtype]
        return super().create(**kwargs)


class PrimarySegregatorWastepickerMap(BaseMixin, db.Model):
    __tablename__ = 'primary_segregator_wastepicker_map'
    wastepicker_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    primary_segregator_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))
    __table_args__ = (db.Index('IX_primary_segregator_wastepicker_map_primary_segregator_id', primary_segregator_id),
                      db.UniqueConstraint('primary_segregator_id', 'wastepicker_id'))
