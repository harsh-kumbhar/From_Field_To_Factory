from flask import Blueprint, request, jsonify
from services.supabase_service import supabase
from utils.auth_utils import hash_password, verify_password
from utils.jwt_utils import generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    existing = supabase.table("buyers") \
        .select("*") \
        .eq("email", email) \
        .execute()

    if existing.data:
        return jsonify({
            "success": False,
            "message": "User already exists"
        }), 400

    hashed_password = hash_password(password)

    response = supabase.table("buyers").insert({
        "company_name": data.get("company_name"),
        "contact_person": data.get("contact_person"),
        "phone_number": data.get("phone_number"),
        "gst_number": data.get("gst_number"),
        "industry_location": data.get("industry_location"),
        "bank_account_no": data.get("bank_account_no"),
        "email": email,
        "password": hashed_password
    }).execute()

    return jsonify({
        "success": True,
        "message": "Registration successful",
        "data": response.data
    })

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    response = supabase.table("buyers") \
        .select("*") \
        .eq("email", email) \
        .execute()

    if not response.data:
        return jsonify({
            "success": False,
            "message": "Invalid email"
        }), 401

    user = response.data[0]

    if not verify_password(password, user["password"]):
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    token = generate_token({
        "id": user["id"],
        "email": user["email"]
    })

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "id": user["id"],
            "company_name": user["company_name"],
            "email": user["email"]
        }
    })