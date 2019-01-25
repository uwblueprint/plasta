from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES


def error_response(message=None, status_code=400):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response


def success(**kwargs):
    response = jsonify(kwargs)
    response.status_code = 200
    return response
