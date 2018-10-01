from flask import jsonify

# Note: Error codes should follow the format found here:
#   https://www.restapitutorial.com/httpstatuscodes.html


def error_response(msg):
    return jsonify({
        "msg": msg,
    }), 400


def success(**kwargs):
    return jsonify(kwargs), 200
