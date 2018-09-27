from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app import db_client

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not db_client.get_user(email):
        return jsonify({"msg": "User does not exist"}), 400

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

