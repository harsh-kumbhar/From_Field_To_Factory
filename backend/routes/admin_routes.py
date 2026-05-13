from flask import Blueprint, jsonify, request

from services.supabase_service import supabase

from utils.auth_utils import verify_password
from utils.jwt_utils import generate_token
from utils.admin_middleware import admin_required

admin_bp = Blueprint(
    "admin",
    __name__
)

# ======================================================
# ADMIN LOGIN
# ======================================================

@admin_bp.route("/login", methods=["POST"])
def admin_login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    response = supabase.table("admins") \
        .select("*") \
        .eq("email", email) \
        .single() \
        .execute()

    admin = response.data

    if not admin:
        return jsonify({
            "success": False,
            "message": "Admin not found"
        }), 404

    valid = verify_password(
        password,
        admin["password"]
    )

    if not valid:
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    token = generate_token({
        "id": admin["id"],
        "email": admin["email"],
        "role": "admin"
    })

    return jsonify({
        "success": True,
        "token": token,
        "admin": {
            "id": admin["id"],
            "name": admin["name"],
            "email": admin["email"]
        }
    })


# ======================================================
# GET PENDING LISTINGS
# ======================================================

@admin_bp.route(
    "/listings",
    methods=["GET"]
)
@admin_required
def get_pending_listings(current_admin):

    response = supabase.table("listings") \
        .select("*") \
        .in_(
            "status",
            ["pending", "flagged"]
        ) \
        .order("created_at", desc=True) \
        .execute()

    return jsonify({
        "success": True,
        "listings": response.data
    })


# ======================================================
# UPDATE LISTING STATUS
# ======================================================

@admin_bp.route(
    "/listing/<listing_id>/status",
    methods=["PATCH"]
)
@admin_required
def update_listing_status(
    current_admin,
    listing_id
):

    data = request.json

    status = data.get("status")

    allowed_statuses = [
        "approved",
        "rejected",
        "flagged"
    ]

    if status not in allowed_statuses:
        return jsonify({
            "success": False,
            "message": "Invalid status"
        }), 400

    update_data = {
        "status": status
    }

    if status == "approved":
        update_data["verified_at"] = "now()"

    response = supabase.table("listings") \
        .update(update_data) \
        .eq("id", listing_id) \
        .execute()

    return jsonify({
        "success": True,
        "message": f"Listing {status}",
        "listing": response.data
    })


# ======================================================
# ADMIN ANALYTICS
# ======================================================

@admin_bp.route(
    "/analytics",
    methods=["GET"]
)
@admin_required
def get_admin_analytics(current_admin):

    total_listings = supabase.table("listings") \
        .select("*", count="exact") \
        .execute()

    approved = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "approved") \
        .execute()

    pending = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "pending") \
        .execute()

    sold = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "sold") \
        .execute()

    buyers = supabase.table("buyers") \
        .select("*", count="exact") \
        .execute()

    farmers = supabase.table("farmers") \
        .select("*", count="exact") \
        .execute()

    purchases = supabase.table("purchases") \
        .select("*", count="exact") \
        .execute()

    return jsonify({
        "success": True,
        "analytics": {
            "total_listings":
                total_listings.count,

            "approved_listings":
                approved.count,

            "pending_listings":
                pending.count,

            "sold_listings":
                sold.count,

            "total_buyers":
                buyers.count,

            "total_farmers":
                farmers.count,

            "total_purchase_requests":
                purchases.count
        }
    })