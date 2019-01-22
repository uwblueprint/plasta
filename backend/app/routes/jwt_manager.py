from flask_jwt_extended import JWTManager
from .db_client import get_blacklisted_auth_token

jwt = JWTManager()


# Define the callback function for the @jwt.token_in_blacklist_loader decorator. If
# app.config['JWT_BLACKLIST_ENABLED'] is set, this will be invoked every time @jwt_required is added
# to an endpoint.
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return get_blacklisted_auth_token(jti) is not None
