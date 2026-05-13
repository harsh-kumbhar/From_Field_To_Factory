import { motion } from "framer-motion";

import {
    Calendar,
    IndianRupee,
    Wheat,
} from "lucide-react";

const AdminListingCard = ({
    listing,
    onStatusUpdate,
    loading,
}) => {
    const imageUrl = listing.image_path
        ? `${import.meta.env.VITE_STORAGE_BUCKET_URL}${listing.image_path}`
        : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";

    const statusColor = {
        pending: "#f59e0b",
        approved: "#22c55e",
        rejected: "#ef4444",
        flagged: "#8b5cf6",
        sold: "#06b6d4",
    };

    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            className="glass glow-green"
            style={{
                borderRadius: "30px",
                overflow: "hidden",
            }}
        >
            {/* IMAGE */}
            <div
                style={{
                    height: "220px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={imageUrl}
                    alt={listing.crop_type}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* CONTENT */}
            <div
                style={{
                    padding: "28px",
                }}
            >
                {/* STATUS */}
                <div
                    style={{
                        display: "inline-block",
                        background:
                            statusColor[
                            listing.status
                            ],
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        marginBottom: "18px",
                        textTransform:
                            "capitalize",
                    }}
                >
                    {listing.status}
                </div>

                {/* TITLE */}
                <h2
                    style={{
                        fontSize: "1.9rem",
                        fontWeight: 800,
                        marginBottom: "20px",
                    }}
                >
                    {listing.crop_type} Biomass
                </h2>

                {/* DETAILS */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        marginBottom: "26px",
                    }}
                >
                    <InfoRow
                        icon={<Wheat size={18} />}
                        label="Quantity"
                        value={`${listing.residue_quantity} Tons`}
                    />

                    <InfoRow
                        icon={
                            <IndianRupee size={18} />
                        }
                        label="Total Value"
                        value={`₹${listing.total_listing_price}`}
                    />

                    <InfoRow
                        icon={
                            <Calendar size={18} />
                        }
                        label="Pickup Date"
                        value={
                            listing.pickup_date
                        }
                    />
                </div>

                {/* ACTIONS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr 1fr 1fr",
                        gap: "12px",
                    }}
                >
                    <button
                        disabled={loading}
                        onClick={() =>
                            onStatusUpdate(
                                listing.id,
                                "approved"
                            )
                        }
                        style={approveBtn}
                    >
                        Approve
                    </button>

                    <button
                        disabled={loading}
                        onClick={() =>
                            onStatusUpdate(
                                listing.id,
                                "rejected"
                            )
                        }
                        style={rejectBtn}
                    >
                        Reject
                    </button>

                    <button
                        disabled={loading}
                        onClick={() =>
                            onStatusUpdate(
                                listing.id,
                                "flagged"
                            )
                        }
                        style={flagBtn}
                    >
                        Flag
                    </button>
                </div>
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
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#94a3b8",
                }}
            >
                {icon}
                {label}
            </div>

            <div
                style={{
                    fontWeight: 700,
                }}
            >
                {value}
            </div>
        </div>
    );
};

const approveBtn = {
    background:
        "linear-gradient(to right,#22c55e,#84cc16)",
    border: "none",
    padding: "12px",
    borderRadius: "14px",
    color: "#020617",
    fontWeight: 800,
    cursor: "pointer",
};

const rejectBtn = {
    background:
        "rgba(239,68,68,0.18)",
    border:
        "1px solid rgba(239,68,68,0.3)",
    padding: "12px",
    borderRadius: "14px",
    color: "#ef4444",
    fontWeight: 800,
    cursor: "pointer",
};

const flagBtn = {
    background:
        "rgba(139,92,246,0.18)",
    border:
        "1px solid rgba(139,92,246,0.3)",
    padding: "12px",
    borderRadius: "14px",
    color: "#a78bfa",
    fontWeight: 800,
    cursor: "pointer",
};

export default AdminListingCard;