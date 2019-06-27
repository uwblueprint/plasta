from . import db
from .mixins import BaseMixin
from .plastic_type_enum import plastic_type_enum
import json


class Transaction(BaseMixin, db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    from_vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    to_vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    to_acknowledged = db.Column(db.Boolean, nullable=True, default=False)
    acknowledged_at = db.Column(db.DateTime)
    price = db.Column(db.Float(2), nullable=False)
    sale_date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    plastics = db.relationship(
        'TransactionPlasticMap', back_populates='transaction')
    creator_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    receipt_image_link = db.Column(db.String(255), nullable=True)
    podio_item_id = db.Column(db.Integer, nullable=True)

    def create_plastics(self, plastics):
        for plastic in plastics:
            plastic['transaction_id'] = self.id
            TransactionPlasticMap.create(**plastic)

    def update_plastics(self, transaction, plastics):
        for plastic in plastics:
            plastic['transaction_id'] = self.id
            tran_plastic_map = TransactionPlasticMap.get_by(first=True, transaction_id=self.id)
            TransactionPlasticMap.update(tran_plastic_map, True, **plastic)


class TransactionPlasticMap(BaseMixin, db.Model):
    __tablename__ = 'transaction_plastic_map'
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transaction.id'), primary_key=True)
    plastic_type = db.Column(
        plastic_type_enum, nullable=False, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(2))
    transaction = db.relationship('Transaction', back_populates='plastics')


class TransactionParentMap(db.Model):
    __tablename__ = 'transaction_parent_map'
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transaction.id'), primary_key=True)
    parent_id = db.Column(
        db.Integer, db.ForeignKey('transaction.id'), primary_key=True)
    __table_args__ = (db.Index('IX_transaction_parent_map_transaction_id',
                               transaction_id),
                      db.UniqueConstraint('transaction_id', 'parent_id'))
