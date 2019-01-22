from . import db
from .mixins import BaseMixin

class BlacklistedAuthToken(BaseMixin, db.Model):
    __tablename__ = 'blacklisted_auth_token'
    token = db.Column(db.String(2047), nullable=False, primary_key=True)
