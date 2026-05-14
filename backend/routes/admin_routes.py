from flask import Blueprint, jsonify, request
import math

from services.supabase_service import supabase
from services.satellite_service import verify_field_polygon

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

@admin_bp.route(
    "/login",
    methods=["POST"]
)
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

            "id":
                admin["id"],

            "name":
                admin["name"],

            "email":
                admin["email"]
        }
    })

# ======================================================
# GET ADMIN LISTINGS
# ======================================================

@admin_bp.route(
    "/listings",
    methods=["GET"]
)
@admin_required
def get_admin_listings(current_admin):

    status = request.args.get("status")
    verified = request.args.get("verified")
    search = request.args.get("search")

    query = supabase.table("listings") \
        .select("*")

    # --------------------------------------------------
    # STATUS FILTER
    # --------------------------------------------------

    if status:

        query = query.eq(
            "status",
            status
        )

    # --------------------------------------------------
    # SATELLITE VERIFIED FILTER
    # --------------------------------------------------

    if verified == "true":

        query = query.eq(
            "satellite_verified",
            True
        )

    elif verified == "false":

        query = query.or_(
            "satellite_verified.is.null,"
            "satellite_verified.eq.false"
        )

    # --------------------------------------------------
    # SEARCH FILTER
    # --------------------------------------------------

    if search:

        query = query.ilike(
            "crop_type",
            f"%{search}%"
        )

    response = query.order(
        "created_at",
        desc=True
    ).execute()

    listings = response.data

    return jsonify({

        "success": True,

        "count":
            len(listings),

        "filters": {

            "status":
                status,

            "verified":
                verified,

            "search":
                search
        },

        "listings":
            listings
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

    response = supabase.table("listings") \
        .update({
            "status": status
        }) \
        .eq("id", listing_id) \
        .execute()

    return jsonify({

        "success": True,

        "message":
            f"Listing {status}",

        "listing":
            response.data
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

    flagged = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "flagged") \
        .execute()

    rejected = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "rejected") \
        .execute()

    satellite_verified = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("satellite_verified", True) \
        .execute()

    pending_verification = supabase.table("listings") \
        .select("*", count="exact") \
        .eq("status", "pending") \
        .is_("satellite_verified", "null") \
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

            "flagged_listings":
                flagged.count,

            "rejected_listings":
                rejected.count,

            "satellite_verified":
                satellite_verified.count,

            "pending_verification":
                pending_verification.count,

            "total_buyers":
                buyers.count,

            "total_farmers":
                farmers.count,

            "total_purchase_requests":
                purchases.count
        }
    })

# ======================================================
# SATELLITE VERIFICATION
# ======================================================

@admin_bp.route(
    "/listing/<listing_id>/verify",
    methods=["POST"]
)
@admin_required
def verify_listing(
    current_admin,
    listing_id
):

    # --------------------------------------------------
    # FETCH LISTING
    # --------------------------------------------------

    listing_response = supabase.table("listings") \
        .select("*") \
        .eq("id", listing_id) \
        .single() \
        .execute()

    listing = listing_response.data

    if not listing:

        return jsonify({
            "success": False,
            "message": "Listing not found"
        }), 404

    # --------------------------------------------------
    # FETCH FIELD
    # --------------------------------------------------

    field_response = supabase.table("fields") \
        .select("*") \
        .eq("id", listing["field_id"]) \
        .single() \
        .execute()

    field = field_response.data

    coordinates = field.get(
        "coordinates",
        []
    )

    if len(coordinates) < 3:

        return jsonify({
            "success": False,
            "message": "Invalid polygon"
        }), 400

    # --------------------------------------------------
    # RUN VERIFICATION
    # --------------------------------------------------

    result = verify_field_polygon(
        coordinates
    )

    if not result["success"]:

        return jsonify(result), 400

    # --------------------------------------------------
    # STORE RESULTS
    # --------------------------------------------------

    update_data = {

        "satellite_verified":
            result["verified"],

        "ndvi":
            result["ndvi"],

        "ndti":
            result["ndti"],

        "bsi":
            result["bsi"],

        "satellite_thumbnail":
            result["satellite_thumbnail"],

        "ndvi_thumbnail":
            result["ndvi_thumbnail"],

        "verification_data":
            result
    }

    supabase.table("listings") \
        .update(update_data) \
        .eq("id", listing_id) \
        .execute()

    return jsonify({

        "success": True,

        "verification":
            result
    })

# ======================================================
# VERIFICATION WORKSPACE DETAILS
# ======================================================

@admin_bp.route(
    "/verification/<listing_id>",
    methods=["GET"]
)
@admin_required
def get_verification_workspace(
    current_admin,
    listing_id
):

    # --------------------------------------------------
    # FETCH LISTING
    # --------------------------------------------------

    listing_response = supabase.table("listings") \
        .select("*") \
        .eq("id", listing_id) \
        .single() \
        .execute()

    listing = listing_response.data

    if not listing:

        return jsonify({
            "success": False,
            "message": "Listing not found"
        }), 404

    # --------------------------------------------------
    # FETCH FIELD
    # --------------------------------------------------

    field_response = supabase.table("fields") \
        .select("*") \
        .eq("id", listing["field_id"]) \
        .single() \
        .execute()

    field = field_response.data

    # --------------------------------------------------
    # FETCH FARMER
    # --------------------------------------------------

    farmer_response = supabase.table("farmers") \
        .select("*") \
        .eq("id", listing["farmer_id"]) \
        .single() \
        .execute()

    farmer = farmer_response.data

    # --------------------------------------------------
    # POLYGON
    # --------------------------------------------------

    coordinates = field.get(
        "coordinates",
        []
    )

    polygon_available = (
        len(coordinates) >= 3
    )

    # --------------------------------------------------
    # MAP CENTER
    # --------------------------------------------------

    map_center = None

    if polygon_available:

        avg_lat = sum(
            p["lat"] for p in coordinates
        ) / len(coordinates)

        avg_lng = sum(
            p["lng"] for p in coordinates
        ) / len(coordinates)

        map_center = {

            "lat":
                avg_lat,

            "lng":
                avg_lng
        }

    # --------------------------------------------------
    # GEOJSON
    # --------------------------------------------------

    geojson_polygon = None

    if polygon_available:

        geojson_polygon = {

            "type":
                "Feature",

            "geometry": {

                "type":
                    "Polygon",

                "coordinates": [[

                    [p["lng"], p["lat"]]
                    for p in coordinates
                ]]
            }
        }

    # --------------------------------------------------
    # BOUNDS
    # --------------------------------------------------

    bounds = None

    if polygon_available:

        lats = [
            p["lat"]
            for p in coordinates
        ]

        lngs = [
            p["lng"]
            for p in coordinates
        ]

        bounds = {

            "north":
                max(lats),

            "south":
                min(lats),

            "east":
                max(lngs),

            "west":
                min(lngs)
        }

    # --------------------------------------------------
    # FIELD SIZE
    # --------------------------------------------------

    field_size_hint = None

    if polygon_available and bounds:

        lat_diff = (
            bounds["north"]
            - bounds["south"]
        )

        lng_diff = (
            bounds["east"]
            - bounds["west"]
        )

        approx_size = math.sqrt(
            lat_diff**2 +
            lng_diff**2
        )

        if approx_size < 0.001:

            field_size_hint = "small"

        elif approx_size < 0.005:

            field_size_hint = "medium"

        else:

            field_size_hint = "large"

    # --------------------------------------------------
    # VERIFICATION PAYLOAD
    # --------------------------------------------------

    verification_data = {

        "satellite_verified":
            listing.get(
                "satellite_verified"
            ),

        "ndvi":
            listing.get("ndvi"),

        "ndti":
            listing.get("ndti"),

        "bsi":
            listing.get("bsi"),

        "satellite_thumbnail":
            listing.get(
                "satellite_thumbnail"
            ),

        "ndvi_thumbnail":
            listing.get(
                "ndvi_thumbnail"
            ),

        "verification_data":
            listing.get(
                "verification_data"
            )
    }

    # --------------------------------------------------
    # RESPONSE
    # --------------------------------------------------

    return jsonify({

        "success": True,

        "listing":
            listing,

        "field":
            field,

        "farmer":
            farmer,

        "verification":
            verification_data,

        "map": {

            "center":
                map_center,

            "polygon":
                coordinates,

            "polygon_available":
                polygon_available,

            "geojson":
                geojson_polygon,

            "bounds":
                bounds,

            "field_size_hint":
                field_size_hint
        }
    })

# ======================================================
# ADMIN PURCHASE GOVERNANCE
# ======================================================

@admin_bp.route(
    "/purchases",
    methods=["GET"]
)
@admin_required
def get_admin_purchases(current_admin):

    status = request.args.get("status")

    query = supabase.table("purchases") \
        .select("*")

    if status:

        query = query.eq(
            "deal_status",
            status
        )

    purchases_response = query.order(
        "created_at",
        desc=True
    ).execute()

    purchases = purchases_response.data

    enriched_purchases = []

    # --------------------------------------------------
    # ENRICH PURCHASES
    # --------------------------------------------------

    for purchase in purchases:

        # ----------------------------------------------
        # LISTING
        # ----------------------------------------------

        listing_response = supabase.table("listings") \
            .select("*") \
            .eq(
                "id",
                purchase["listing_id"]
            ) \
            .single() \
            .execute()

        listing = listing_response.data

        # ----------------------------------------------
        # BUYER
        # ----------------------------------------------

        buyer_response = supabase.table("buyers") \
            .select("*") \
            .eq(
                "id",
                purchase["buyer_id"]
            ) \
            .single() \
            .execute()

        buyer = buyer_response.data

        # ----------------------------------------------
        # FARMER
        # ----------------------------------------------

        farmer = None

        if listing:

            farmer_response = supabase.table("farmers") \
                .select("*") \
                .eq(
                    "id",
                    listing["farmer_id"]
                ) \
                .single() \
                .execute()

            farmer = farmer_response.data

        # ----------------------------------------------
        # BUILD OBJECT
        # ----------------------------------------------

        enriched_purchases.append({

            "purchase":
                purchase,

            "listing":
                listing,

            "buyer":
                buyer,

            "farmer":
                farmer
        })

    return jsonify({

        "success": True,

        "count":
            len(enriched_purchases),

        "purchases":
            enriched_purchases
    })