from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin

vendor_type_enum = db.Enum(
    'admin',
    'wastepicker',
    'dwcc',
    'wholesaler',
    'manufacturer',
    name='vendor_type')

vendor_subtype_enum = db.Enum(
    'wastepicker',
    'home_based_worker',
    'itinerant_buyer',
    'wp_community_leader',
    'small_scrap_shop',
    'scrap_shop',
    'van_unit',
    'dwcc',
    'wholesaler',
    'export_wholesaler',
    'franchisee_partner',
    'processor',
    'brand',
    'admin',
    name='vendor_subtype')

vendor_subtype_map = {
    'admin': 'admin',
    'wastepicker': 'wastepicker',
    'home_based_worker': 'wastepicker',
    'itinerant_buyer': 'wastepicker',
    'wp_community_leader': 'wastepicker',
    'small_scrap_shop': 'dwcc',
    'scrap_shop': 'dwcc',
    'van_unit': 'dwcc',
    'dwcc': 'dwcc',
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

    @classmethod
    def create(cls, **kwargs):
        # Override the `create` method to enforce that `vendor_type` is
        # the proper parent of `vendor_subtype`.
        subtype = kwargs['vendor_subtype']
        kwargs['vendor_type'] = vendor_subtype_map[subtype]
        return super().create(**kwargs)


class DWCCWastepickerMap(BaseMixin, db.Model):
    __tablename__ = 'dwcc_wastepicker_map'
    wastepicker_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    dwcc_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))
    __table_args__ = (db.Index('IX_dwcc_wastepicker_map_dwcc_id', dwcc_id),
                      db.UniqueConstraint('dwcc_id', 'wastepicker_id'))
