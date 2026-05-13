from functools import wraps
from flask import request, jsonify

from utils.jwt_utils import verify_token

def admin_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        if "Authorization" in request.headers:

            bearer = request.headers["Authorization"]

            try:
                token = bearer.split(" ")[1]
            except Exception:
                return jsonify({
                    "success": False,
                    "message": "Invalid token format"
                }), 401

        if not token:
            return jsonify({
                "success": False,
                "message": "Token missing"
            }), 401

        current_admin = verify_token(token)

        if not current_admin:
            return jsonify({
                "success": False,
                "message": "Invalid token"
            }), 401

        return f(current_admin, *args, **kwargs)

    return decorated