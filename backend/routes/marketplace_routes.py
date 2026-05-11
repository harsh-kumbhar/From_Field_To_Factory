from flask import Blueprint, jsonify, request
from services.supabase_service import supabase

marketplace_bp = Blueprint(
    "marketplace",
    __name__
)

# =========================================================
# GET APPROVED MARKETPLACE LISTINGS
# =========================================================

@marketplace_bp.route("/listings", methods=["GET"])
def get_marketplace_listings():

    query = supabase.table("listings") \
        .select("*") \
        .eq("status", "approved")

    crop = request.args.get("crop")
    min_qty = request.args.get("min_qty")
    search = request.args.get("search")

    # Crop Filter
    if crop:
        query = query.eq("crop_type", crop)

    # Quantity Filter
    if min_qty:
        query = query.gte(
            "residue_quantity",
            float(min_qty)
        )

    # Search Filter
    if search:
        query = query.ilike(
            "title",
            f"%{search}%"
        )

    # Execute Query
    response = query.order(
        "created_at",
        desc=True
    ).execute()

    listings = response.data

    return jsonify({
        "success": True,
        "count": len(listings),
        "listings": listings
    })


# =========================================================
# GET SINGLE LISTING DETAILS
# =========================================================

@marketplace_bp.route(
    "/listing/<listing_id>",
    methods=["GET"]
)
def get_listing_details(listing_id):

    # -----------------------------------------------------
    # FETCH LISTING
    # -----------------------------------------------------

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

    # -----------------------------------------------------
    # FETCH FIELD DATA
    # -----------------------------------------------------

    field_response = supabase.table("fields") \
        .select("*") \
        .eq("id", listing["field_id"]) \
        .single() \
        .execute()

    field_data = field_response.data

    # -----------------------------------------------------
    # POLYGON / MAP PROCESSING
    # -----------------------------------------------------

    coordinates = field_data.get("coordinates", [])

    # Polygon Availability
    field_data["polygon_available"] = (
        len(coordinates) > 2
    )

    # Calculate Map Center
    if coordinates:

        avg_lat = sum(
            p["lat"] for p in coordinates
        ) / len(coordinates)

        avg_lng = sum(
            p["lng"] for p in coordinates
        ) / len(coordinates)

        field_data["map_center"] = {
            "lat": avg_lat,
            "lng": avg_lng
        }

    # -----------------------------------------------------
    # FINAL RESPONSE
    # -----------------------------------------------------

    return jsonify({
        "success": True,
        "listing": {
            **listing,
            "field": field_data
        }
    })