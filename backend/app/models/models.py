from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import CRUDMixin

project_type_enum = db.Enum('internal', 'external', name='project_type')

plastic_type_enum = db.Enum(
    'green_pet',
    'pet_light_blue',
    'brown_pet',
    'pet_non_food_clear',
    'pet_clear',
    name='plastic_type')


class User(CRUDMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.Binary(60), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    meta_data = db.Column(JSONB)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    __table_args__ = (db.Index('IX_user_email', func.lower(email)), )


class Project(CRUDMixin, db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    project_type = db.Column(project_type_enum, nullable=False)
    plastics = db.relationship('ProjectPlasticMap', back_populates='project')
    meta_data = db.Column(JSONB)


class Transaction(CRUDMixin, db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), nullable=False)
    from_vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    to_vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    to_acknowledged = db.Column(db.Boolean, nullable=False, default=False)
    acknowledged_at = db.Column(db.DateTime)
    price = db.Column(db.Float(2), nullable=False)
    sale_date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    plastics = db.relationship(
        'TransactionPlasticMap', back_populates='transaction')
    creator_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())


class DWCCWastepickerMap(db.Model):
    __tablename__ = 'dwcc_wastepicker_map'
    wastepicker_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    dwcc_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))
    __table_args__ = (db.Index('IX_dwcc_wastepicker_map_dwcc_id', dwcc_id),
                      db.UniqueConstraint('dwcc_id', 'wastepicker_id'))


class ProjectVendorMap(db.Model):
    __tablename__ = 'project_vendor_map'
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), primary_key=True)
    vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    __table_args__ = (db.Index('IX_project_vendor_map_project_id', project_id),
                      db.Index('IX_project_vendor_map_vendor_id', vendor_id),
                      db.UniqueConstraint('project_id', 'vendor_id'))


class ProjectPlasticMap(CRUDMixin, db.Model):
    __tablename__ = 'project_plastic_map'
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), primary_key=True)
    plastic_type = db.Column(
        plastic_type_enum, nullable=False, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    project = db.relationship('Project', back_populates='plastics')


class TransactionPlasticMap(db.Model):
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
