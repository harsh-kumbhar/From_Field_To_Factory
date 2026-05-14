from flask import Blueprint, jsonify, request

from services.supabase_service import supabase
from utils.auth_middleware import token_required

purchase_bp = Blueprint(
    "purchase",
    __name__
)

# ======================================================
# CREATE PURCHASE REQUEST
# ======================================================

@purchase_bp.route(
    "/request",
    methods=["POST"]
)
@token_required
def create_purchase_request(current_user):

    data = request.json

    listing_id = data.get("listing_id")

    if not listing_id:
        return jsonify({
            "success": False,
            "message": "Listing ID required"
        }), 400

    # --------------------------------------------------
    # FETCH LISTING
    # --------------------------------------------------

    listing_response = supabase.table("listings") \
        .select("*") \
        .eq("id", listing_id) \
        .single() \
        .execute()

    if not listing_response.data:
        return jsonify({
            "success": False,
            "message": "Listing not found"
        }), 404

    listing = listing_response.data

    # --------------------------------------------------
    # CHECK SOLD STATUS
    # --------------------------------------------------

    if listing["status"] == "sold":

        return jsonify({
            "success": False,
            "message": "Listing already sold"
        }), 400

    # --------------------------------------------------
    # PRICE RESOLUTION
    # --------------------------------------------------

    price_per_tonne = (
        listing.get(
            "predicted_price_per_tonne"
        )
    )

    # --------------------------------------------------
    # FALLBACK FOR LEGACY LISTINGS
    # --------------------------------------------------

    if not price_per_tonne:

        residue_qty = (
            listing.get("residue_quantity")
            or 0
        )

        expected_price = (
            listing.get("expected_price")
            or 0
        )

        if residue_qty > 0:

            price_per_tonne = (
                expected_price / residue_qty
            )

    # --------------------------------------------------
    # FINAL SAFETY CHECK
    # --------------------------------------------------

    if not price_per_tonne:

        return jsonify({
            "success": False,
            "message":
                "Listing pricing unavailable"
        }), 400

    # --------------------------------------------------
    # TOTAL AMOUNT
    # --------------------------------------------------

    residue_quantity = (
        listing.get("residue_quantity")
        or 0
    )

    total_amount = round(
        price_per_tonne
        * residue_quantity,
        2
    )

    # --------------------------------------------------
    # CREATE PURCHASE REQUEST
    # --------------------------------------------------

    purchase_data = {

        "listing_id":
            listing_id,

        "buyer_id":
            current_user["id"],

        "agreed_price_per_tonne":
            round(price_per_tonne, 2),

        "total_amount":
            total_amount,

        "deal_status":
            "pending",

        "buyer_message":
            data.get(
                "buyer_message",
                ""
            )
    }

    response = supabase.table("purchases") \
        .insert(purchase_data) \
        .execute()

    return jsonify({
        "success": True,
        "message": "Purchase request sent",
        "purchase": response.data
    })


# ======================================================
# GET MY PURCHASE REQUESTS
# ======================================================

@purchase_bp.route(
    "/my-requests",
    methods=["GET"]
)
@token_required
def get_my_requests(current_user):

    response = supabase.table("purchases") \
        .select("*") \
        .eq(
            "buyer_id",
            current_user["id"]
        ) \
        .order(
            "created_at",
            desc=True
        ) \
        .execute()

    return jsonify({
        "success": True,
        "requests": response.data
    })


# ======================================================
# UPDATE PURCHASE STATUS
# ======================================================

@purchase_bp.route(
    "/<purchase_id>/status",
    methods=["PATCH"]
)
def update_purchase_status(purchase_id):

    data = request.json

    status = data.get("status")

    if status not in [
        "accepted",
        "rejected"
    ]:

        return jsonify({
            "success": False,
            "message": "Invalid status"
        }), 400

    # --------------------------------------------------
    # UPDATE PURCHASE
    # --------------------------------------------------

    purchase_response = supabase.table("purchases") \
        .update({
            "deal_status": status
        }) \
        .eq("id", purchase_id) \
        .execute()

    purchase = purchase_response.data[0]

    # --------------------------------------------------
    # IF ACCEPTED -> MARK LISTING SOLD
    # --------------------------------------------------

    if status == "accepted":

        supabase.table("listings") \
            .update({
                "status": "sold"
            }) \
            .eq(
                "id",
                purchase["listing_id"]
            ) \
            .execute()

    return jsonify({
        "success": True,
        "message": f"Purchase {status}"
    })