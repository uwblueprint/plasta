from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin


class User(BaseMixin, db.Model):
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

    TO_DICT_WHITELIST = ['id', 'email', 'active', 'vendor_id', 'meta_data']
