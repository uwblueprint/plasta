from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    stakeholder_id = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(15))
    email = db.Column(db.String(254))
    notes = db.Column(db.Text)
    password = db.Column(db.Text, nullable=False)
    forgot_password_token = db.Column(db.String(10))
    created = db.Column(db.DateTime, nullable=False)


class UserAttribute(db.Model):
    __tablename__ = 'user_attribute'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    data_type = db.Column(db.Text, nullable=False)
    is_required = db.Column(db.Boolean, nullable=False)


class UserValueInt(db.Model):
    __tablename__ = 'user_value_int'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(db.Integer, db.ForeignKey('user_attribute.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    value = db.Column(db.Integer, nullable=False)


class UserValueText(db.Model):
    __tablename__ = 'user_value_text'
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(db.Integer, db.ForeignKey('user_attribute.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    value = db.Column(db.Text, nullable=False)


db.create_all()
