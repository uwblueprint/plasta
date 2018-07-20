from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Many to many relationship
projects_association_table = db.Table(
    'projects_association', db.Model.metadata,
    db.Column(
        'project_id', db.Integer, db.ForeignKey('projects.id'),
        nullable=False),
    db.Column(
        'user_id', db.Integer, db.ForeignKey('users.id'), nullable=False))


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    stakeholder_id = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(15))
    email = db.Column(db.String(254))
    notes = db.Column(db.Text)
    password = db.Column(db.Text, nullable=False)
    forgot_password_token = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    projects = db.relationship(
        'Projects', secondary=projects_association_table)


class UserAttributes(db.Model):
    __tablename__ = 'user_attributes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    data_type = db.Column(db.Text, nullable=False)
    is_required = db.Column(db.Boolean, nullable=False)


class UserValuesInt(db.Model):
    __tablename__ = 'user_values_int'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(
        db.Integer, db.ForeignKey('user_attributes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    value = db.Column(db.Integer, nullable=False)


class UserValuesText(db.Model):
    __tablename__ = 'user_values_text'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(
        db.Integer, db.ForeignKey('user_attributes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    value = db.Column(db.Text, nullable=False)


class Projects(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.Integer, nullable=False)
    gdrive_link = db.Column(db.Integer, nullable=False)
    shipping_terms = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    users = db.relationship('Users', secondary=projects_association_table)


class CostModel(db.Model):
    __tablename__ = 'cost_model'
    project_id = db.Column(
        db.Integer, db.ForeignKey('projects.id'), primary_key=True)
    wastepicker_sell_price = db.Column(db.Float, nullable=False)
    wholesaler_purchase_price = db.Column(db.Float, nullable=False)
    wholesaler_sell_price = db.Column(db.Float, nullable=False)
    price_buoyancy = db.Column(db.Float, nullable=False)
    wholesaler_exworks_price = db.Column(db.Float, nullable=False)
    wholesaler_shipping_price = db.Column(db.Float, nullable=False)
    wholesaler_delivered_price = db.Column(db.Float, nullable=False)
    pfc_transaction_fee = db.Column(db.Float, nullable=False)


class Transactions(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(
        db.Integer, db.ForeignKey('projects.id'), nullable=False)
    from_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    sale_date = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


class TransactionAttributes(db.Model):
    __tablename__ = 'transaction_attributes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    data_type = db.Column(db.Text, nullable=False)
    is_required = db.Column(db.Boolean, nullable=False)


class TransactionValuesFloat(db.Model):
    __tablename__ = 'transaction_values_float'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(
        db.Integer, db.ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transactions.id'), nullable=False)
    value = db.Column(db.Float, nullable=False)


class TransactionValuesInt(db.Model):
    __tablename__ = 'transaction_values_int'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(
        db.Integer, db.ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transactions.id'), nullable=False)
    value = db.Column(db.Integer, nullable=False)


class TransactionValuesText(db.Model):
    __tablename__ = 'transaction_values_text'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(
        db.Integer, db.ForeignKey('transaction_attributes.id'), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transactions.id'), nullable=False)
    value = db.Column(db.Text, nullable=False)


class TransactionParents(db.Model):
    __tablename__ = 'transaction_parents'
    transaction_id = db.Column(
        db.Integer, db.ForeignKey('transactions.id'), primary_key=True)
    parent_id = db.Column(
        db.Integer, db.ForeignKey('transactions.id'), primary_key=True)
