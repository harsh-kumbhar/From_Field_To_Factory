from functools import wraps
from flask import request, jsonify

from utils.jwt_utils import verify_token

# ======================================================
# JWT AUTH MIDDLEWARE
# ======================================================

def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        # ---------------------------------------------
        # READ AUTH HEADER
        # ---------------------------------------------

        if "Authorization" in request.headers:

            bearer = request.headers["Authorization"]

            try:
                token = bearer.split(" ")[1]
            except Exception:
                return jsonify({
                    "success": False,
                    "message": "Invalid token format"
                }), 401

        # ---------------------------------------------
        # TOKEN MISSING
        # ---------------------------------------------

        if not token:
            return jsonify({
                "success": False,
                "message": "Token missing"
            }), 401

        # ---------------------------------------------
        # VERIFY TOKEN
        # ---------------------------------------------

        current_user = verify_token(token)

        if not current_user:
            return jsonify({
                "success": False,
                "message": "Invalid or expired token"
            }), 401

        # ---------------------------------------------
        # PROCEED TO ROUTE
        # ---------------------------------------------

        return f(current_user, *args, **kwargs)

    return decorated