import jwt
import datetime
import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "field_to_factory_super_secure_key"
)

# ======================================================
# GENERATE JWT TOKEN
# ======================================================

def generate_token(data):

    payload = {
        "data": data,
        "exp": datetime.datetime.utcnow()
        + datetime.timedelta(days=7)
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )


# ======================================================
# VERIFY JWT TOKEN
# ======================================================

def verify_token(token):

    try:

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return decoded["data"]

    except Exception:
        return Nones