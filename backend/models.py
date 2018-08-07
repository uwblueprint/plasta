from app import app
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import ARRAY, ENUM, JSONB

db = SQLAlchemy(app)
migrate = Migrate(app, db)

vendor_type_enum = db.Enum(
    'admin',
    'wastepicker',
    'dwcc',
    'wholesaler',
    'manufacturer',
    name='vendor_type')

project_type_enum = db.Enum('internal', 'external', name='project_type')

plastic_type_enum = db.Enum(
    'green_pet',
    'pet_light_blue',
    'brown_pet',
    'pet_non_food_clear',
    'pet_clear',
    name='plastic_type')


class Vendor(db.Model):
    __tablename__ = 'vendor'
    id = db.Column(db.Integer, primary_key=True)
    vendor_type = db.Column(vendor_type_enum, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    meta_data = db.Column(JSONB)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(60), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    vendor_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), nullable=False)
    meta_data = db.Column(JSONB)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    __table_args__ = (db.Index('IX_user_email', func.lower(email)), )


class Project(db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    project_type = db.Column(project_type_enum, nullable=False)
    plastic_types = db.Column(ARRAY(plastic_type_enum))
    meta_data = db.Column(JSONB)


class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(
        db.Integer, db.ForeignKey('project.id'), nullable=False)
    from_vendor_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    to_vendor_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
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
    dwcc_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
    wastepicker_id = db.Column(
        db.Integer, db.ForeignKey('vendor.id'), primary_key=True)
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


class TransactionPlasticMap(db.Model):
    __tablename__ = 'transaction_plastic_map'
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'))
    plastic_type = db.Column(plastic_type_enum, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(2))
    transaction = db.relationship('Transaction', back_populates='plastics')


class TransactionParentMap(db.Model):
    __tablename__ = 'transaction_parent_map'
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transaction.id'), primary_key=True)
    parent_id = db.Column(
        db.Integer, db.ForeignKey('transaction.id'), primary_key=True)
