import os
import ee

from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# ======================================================
# GOOGLE EARTH ENGINE INITIALIZATION
# ======================================================

raw_key = os.getenv(
    "GEE_PRIVATE_KEY",
    ""
).replace("\\n", "\n")

creds = ee.ServiceAccountCredentials(
    os.getenv("GEE_SERVICE_ACCOUNT"),
    key_data=raw_key
)

ee.Initialize(
    creds,
    opt_url="https://earthengine.googleapis.com"
)

# ======================================================
# GET BEST SENTINEL-2 IMAGE
# ======================================================

def get_best_image(geometry):

    for days in [30, 60, 90, 180]:

        end = datetime.utcnow()
        start = end - timedelta(days=days)

        collection = (
            ee.ImageCollection(
                "COPERNICUS/S2_SR_HARMONIZED"
            )
            .filterBounds(geometry)
            .filterDate(
                start.strftime("%Y-%m-%d"),
                end.strftime("%Y-%m-%d")
            )
            .filter(
                ee.Filter.lt(
                    "CLOUDY_PIXEL_PERCENTAGE",
                    20
                )
            )
            .sort("CLOUDY_PIXEL_PERCENTAGE")
        )

        if collection.size().getInfo() > 0:
            return collection.first()

    return None

# ======================================================
# VERIFY FIELD POLYGON
# ======================================================

def verify_field_polygon(coordinates):

    try:

        # --------------------------------------------------
        # CREATE POLYGON
        # --------------------------------------------------

        polygon_coords = [
            [p["lng"], p["lat"]]
            for p in coordinates
        ]

        # CLOSE POLYGON IF NEEDED

        if polygon_coords[0] != polygon_coords[-1]:
            polygon_coords.append(
                polygon_coords[0]
            )

        polygon = ee.Geometry.Polygon([
            polygon_coords
        ])

        # --------------------------------------------------
        # GET SATELLITE IMAGE
        # --------------------------------------------------

        image = get_best_image(polygon)

        if image is None:
            return {
                "success": False,
                "message": "No satellite image found"
            }

        # --------------------------------------------------
        # NDVI
        # --------------------------------------------------

        ndvi = image.normalizedDifference(
            ["B8", "B4"]
        ).rename("NDVI")

        # --------------------------------------------------
        # NDTI
        # --------------------------------------------------

        ndti = image.normalizedDifference(
            ["B11", "B12"]
        ).rename("NDTI")

        # --------------------------------------------------
        # BSI
        # --------------------------------------------------

        bsi = image.expression(
            """
            ((B11 + B4) - (B8 + B2)) /
            ((B11 + B4) + (B8 + B2) + 1e-9)
            """,
            {
                "B11": image.select("B11"),
                "B4": image.select("B4"),
                "B8": image.select("B8"),
                "B2": image.select("B2")
            }
        ).rename("BSI")

        # --------------------------------------------------
        # COMPUTE MEAN VALUES
        # --------------------------------------------------

        stats = (
            ndvi.addBands(ndti)
            .addBands(bsi)
            .reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=polygon,
                scale=10,
                maxPixels=1e9
            )
            .getInfo()
        )

        ndvi_val = stats.get("NDVI", 0)
        ndti_val = stats.get("NDTI", 0)
        bsi_val = stats.get("BSI", 0)

        # --------------------------------------------------
        # VERIFICATION LOGIC
        # --------------------------------------------------

        is_harvested = ndvi_val < 0.28
        has_residue = ndti_val > 0.05
        has_bare_soil = bsi_val > 0

        verified = (
            is_harvested
            and has_residue
            and has_bare_soil
        )

        # --------------------------------------------------
        # TRUE COLOR SATELLITE IMAGE
        # --------------------------------------------------

        true_color_thumbnail = image.select(
            ["B4", "B3", "B2"]
        ).visualize(
            min=0,
            max=3000,
            gamma=1.2
        ).getThumbURL({
            "dimensions": 1024,
            "region": polygon.bounds().getInfo()["coordinates"],
            "format": "png"
        })

        # --------------------------------------------------
        # NDVI HEATMAP
        # --------------------------------------------------

        ndvi_visual = ndvi.visualize(
            min=-0.2,
            max=0.8,
            palette=[
                "#8B4513",   # brown
                "#D2B48C",   # tan
                "#FFFF66",   # yellow
                "#7CFC00",   # light green
                "#006400"    # dark green
            ]
        )

        ndvi_thumbnail = ndvi_visual.getThumbURL({
            "dimensions": 1024,
            "region": polygon.bounds().getInfo()["coordinates"],
            "format": "png"
        })

        # --------------------------------------------------
        # RETURN RESULTS
        # --------------------------------------------------

        return {

            "success": True,

            "verified": verified,

            "ndvi": round(ndvi_val, 3),

            "ndti": round(ndti_val, 3),

            "bsi": round(bsi_val, 3),

            "satellite_thumbnail":
                true_color_thumbnail,

            "ndvi_thumbnail":
                ndvi_thumbnail,

            "details": {

                "is_harvested":
                    is_harvested,

                "has_residue":
                    has_residue,

                "has_bare_soil":
                    has_bare_soil
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }