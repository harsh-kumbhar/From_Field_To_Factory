import { motion } from "framer-motion";

import {
    Calendar,
    IndianRupee,
    Wheat,
    MapPin,
    ShieldCheck,
    Satellite,
    ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import VerificationBadge from "./VerificationBadge";

const AdminListingCard = ({
    listing,
}) => {
    const navigate = useNavigate();

    const imageUrl = listing.image_path
        ? `${import.meta.env.VITE_STORAGE_BUCKET_URL}${listing.image_path}`
        : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";

    const statusConfig = {
        pending: {
            bg: "rgba(245,158,11,0.18)",
            border:
                "1px solid rgba(245,158,11,0.3)",
            color: "#fbbf24",
            label:
                "Pending Verification",
        },

        approved: {
            bg: "rgba(34,197,94,0.18)",
            border:
                "1px solid rgba(34,197,94,0.3)",
            color: "#4ade80",
            label: "Approved",
        },

        rejected: {
            bg: "rgba(239,68,68,0.18)",
            border:
                "1px solid rgba(239,68,68,0.3)",
            color: "#f87171",
            label: "Rejected",
        },

        flagged: {
            bg: "rgba(139,92,246,0.18)",
            border:
                "1px solid rgba(139,92,246,0.3)",
            color: "#c084fc",
            label: "Flagged",
        },

        sold: {
            bg: "rgba(6,182,212,0.18)",
            border:
                "1px solid rgba(6,182,212,0.3)",
            color: "#67e8f9",
            label: "Sold",
        },
    };

    const currentStatus =
        statusConfig[
        listing.status
        ] || statusConfig.pending;

    const hasPricing =
        listing.predicted_price_per_tonne ||
        listing.expected_price;

    const pricingLabel =
        listing.predicted_price_per_tonne
            ? "AI Verified Pricing"
            : "Estimated Pricing";

    const priceValue =
        listing.predicted_price_per_tonne ||
        listing.expected_price ||
        "Unavailable";

    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            transition={{
                duration: 0.25,
            }}
            className="glass glow-green"
            style={{
                borderRadius: "32px",
                overflow: "hidden",
                border:
                    listing.satellite_verified
                        ? "1px solid rgba(34,197,94,0.25)"
                        : "1px solid rgba(255,255,255,0.08)",

                background:
                    "linear-gradient(to bottom right, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
            }}
        >
            {/* IMAGE */}
            <div
                style={{
                    position: "relative",
                    height: "240px",
                }}
            >
                <img
                    src={imageUrl}
                    alt={listing.crop_type}
                    onError={(e) => {
                        e.target.src =
                            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                {/* OVERLAY */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(2,6,23,0.96), rgba(2,6,23,0.1))",
                    }}
                />

                {/* STATUS */}
                <div
                    style={{
                        position: "absolute",
                        top: "18px",
                        left: "18px",
                    }}
                >
                    <div
                        style={{
                            background:
                                currentStatus.bg,
                            border:
                                currentStatus.border,
                            color:
                                currentStatus.color,
                            padding:
                                "10px 16px",
                            borderRadius:
                                "999px",
                            fontWeight: 800,
                            backdropFilter:
                                "blur(10px)",
                            fontSize:
                                "0.9rem",
                        }}
                    >
                        {
                            currentStatus.label
                        }
                    </div>
                </div>

                {/* VERIFICATION BADGE */}
                {listing.satellite_verified && (
                    <div
                        style={{
                            position:
                                "absolute",
                            top: "18px",
                            right: "18px",
                        }}
                    >
                        <VerificationBadge
                            verified={
                                true
                            }
                        />
                    </div>
                )}

                {/* BOTTOM INFO */}
                <div
                    style={{
                        position:
                            "absolute",
                        bottom: "22px",
                        left: "22px",
                    }}
                >
                    <p
                        style={{
                            color:
                                "#84cc16",
                            marginBottom:
                                "8px",
                            fontWeight: 700,
                        }}
                    >
                        Biomass Intelligence
                    </p>

                    <h2
                        style={{
                            fontSize:
                                "2rem",
                            fontWeight: 900,
                            color: "white",
                        }}
                    >
                        {
                            listing.crop_type
                        }
                    </h2>
                </div>
            </div>

            {/* CONTENT */}
            <div
                style={{
                    padding: "30px",
                }}
            >
                {/* SATELLITE STATUS */}
                <div
                    style={{
                        display: "flex",
                        alignItems:
                            "center",
                        gap: "12px",
                        marginBottom:
                            "26px",

                        padding:
                            "14px 18px",

                        borderRadius:
                            "18px",

                        background:
                            listing.satellite_verified
                                ? "rgba(34,197,94,0.12)"
                                : "rgba(245,158,11,0.12)",

                        border:
                            listing.satellite_verified
                                ? "1px solid rgba(34,197,94,0.2)"
                                : "1px solid rgba(245,158,11,0.2)",
                    }}
                >
                    <Satellite
                        size={18}
                        color={
                            listing.satellite_verified
                                ? "#22c55e"
                                : "#f59e0b"
                        }
                    />

                    <div>
                        <p
                            style={{
                                fontWeight: 800,
                                color:
                                    listing.satellite_verified
                                        ? "#4ade80"
                                        : "#fbbf24",
                            }}
                        >
                            {listing.satellite_verified
                                ? "Satellite Verified"
                                : "Pending Satellite Verification"}
                        </p>

                        <p
                            style={{
                                color:
                                    "#94a3b8",
                                fontSize:
                                    "0.85rem",
                                marginTop:
                                    "4px",
                            }}
                        >
                            AI-powered geospatial analysis
                        </p>
                    </div>
                </div>

                {/* DETAILS */}
                <div
                    style={{
                        display: "flex",
                        flexDirection:
                            "column",
                        gap: "18px",
                        marginBottom:
                            "30px",
                    }}
                >
                    <InfoRow
                        icon={
                            <Wheat
                                size={18}
                            />
                        }
                        label="Residue Quantity"
                        value={`${listing.residue_quantity || 0} Tons`}
                    />

                    <InfoRow
                        icon={
                            <IndianRupee
                                size={18}
                            />
                        }
                        label={
                            pricingLabel
                        }
                        value={
                            hasPricing
                                ? `₹${priceValue}/Ton`
                                : "Unavailable"
                        }
                    />

                    <InfoRow
                        icon={
                            <Calendar
                                size={18}
                            />
                        }
                        label="Pickup Date"
                        value={
                            listing.pickup_date ||
                            "Not Available"
                        }
                    />

                    <InfoRow
                        icon={
                            <MapPin
                                size={18}
                            />
                        }
                        label="Region"
                        value={`${listing.district || "--"}, ${listing.state || "--"}`}
                    />
                </div>

                {/* METRICS */}
                {listing.satellite_verified && (
                    <div
                        style={{
                            display:
                                "grid",

                            gridTemplateColumns:
                                "repeat(3,1fr)",

                            gap: "12px",

                            marginBottom:
                                "30px",
                        }}
                    >
                        <MetricCard
                            label="NDVI"
                            value={
                                listing.ndvi
                            }
                            color="#22c55e"
                        />

                        <MetricCard
                            label="NDTI"
                            value={
                                listing.ndti
                            }
                            color="#06b6d4"
                        />

                        <MetricCard
                            label="BSI"
                            value={
                                listing.bsi
                            }
                            color="#f59e0b"
                        />
                    </div>
                )}

                {/* OPEN WORKSPACE */}
                <button
                    onClick={() =>
                        navigate(
                            `/admin/verification/${listing.id}`
                        )
                    }
                    style={{
                        width: "100%",

                        background:
                            "linear-gradient(to right,#22c55e,#84cc16)",

                        border: "none",

                        padding:
                            "16px 18px",

                        borderRadius:
                            "18px",

                        color:
                            "#020617",

                        fontWeight: 900,

                        fontSize:
                            "1rem",

                        cursor:
                            "pointer",

                        display: "flex",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        gap: "10px",
                    }}
                >
                    Open Verification Workspace

                    <ArrowRight
                        size={18}
                    />
                </button>
            </div>
        </motion.div>
    );
};

const InfoRow = ({
    icon,
    label,
    value,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
                gap: "12px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems:
                        "center",
                    gap: "10px",
                    color: "#94a3b8",
                    fontWeight: 600,
                }}
            >
                {icon}
                {label}
            </div>

            <div
                style={{
                    color: "white",
                    fontWeight: 800,
                    textAlign: "right",
                }}
            >
                {value}
            </div>
        </div>
    );
};

const MetricCard = ({
    label,
    value,
    color,
}) => {
    return (
        <div
            style={{
                background:
                    "rgba(255,255,255,0.04)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius:
                    "18px",

                padding: "16px",

                textAlign: "center",
            }}
        >
            <p
                style={{
                    color: "#94a3b8",
                    fontSize: "0.8rem",
                    marginBottom: "8px",
                }}
            >
                {label}
            </p>

            <h3
                style={{
                    color,
                    fontWeight: 900,
                    fontSize: "1.15rem",
                }}
            >
                {typeof value ===
                    "number"
                    ? value.toFixed(
                        2
                    )
                    : "--"}
            </h3>
        </div>
    );
};

export default AdminListingCard;