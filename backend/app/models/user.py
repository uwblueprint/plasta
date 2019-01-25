import bcrypt

from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB

from . import db
from .mixins import BaseMixin
from .vendor import Vendor


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

    @classmethod
    def create(cls, **kwargs):
        password = kwargs.pop('password').encode('ascii', 'ignore')
        salt = bcrypt.gensalt()
        kwargs['password_hash'] = bcrypt.hashpw(password, salt)
        return super().create(**kwargs)

    def authenticate(self, password):
        password = password.encode('ascii', 'ignore')
        if bcrypt.hashpw(password, self.password_hash) == self.password_hash:
            return self
        return None

    def to_dict(self, include_relationships=False):
        data = super(User, self).to_dict(include_relationships)
        data['vendor'] = Vendor.get(self.vendor_id).to_dict()
        return data
