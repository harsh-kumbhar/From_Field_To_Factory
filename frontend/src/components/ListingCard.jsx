import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
    Leaf,
    ShieldCheck,
    Calendar,
    Package,
} from "lucide-react";

import { useTranslation } from "react-i18next";

const ListingCard = ({ listing }) => {
    const { t } = useTranslation();

    const imageUrl = listing.image_path
        ? `${import.meta.env.VITE_STORAGE_BUCKET_URL}${listing.image_path}`
        : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass glow-green"
            style={{
                borderRadius: "34px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns:
                    window.innerWidth < 900
                        ? "1fr"
                        : "1fr 1.2fr",
                minHeight: "340px",
            }}
        >
            {/* IMAGE SIDE */}
            <div
                style={{
                    position: "relative",
                    height: "100%",
                    minHeight: "340px",
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
                            "linear-gradient(to top, rgba(2,6,23,0.95), rgba(2,6,23,0.1))",
                    }}
                />

                {/* VERIFIED */}
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        background: "#22c55e",
                        color: "#020617",
                        padding: "10px 16px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                    }}
                >
                    <ShieldCheck size={18} />
                    {t("marketplacePage.verified")}
                </div>

                {/* IMAGE LABEL */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "24px",
                        left: "24px",
                    }}
                >
                    <p
                        style={{
                            color: "#84cc16",
                            marginBottom: "8px",
                            fontWeight: 700,
                        }}
                    >
                        {t("marketplacePage.biomassListing")}
                    </p>

                    <h2
                        style={{
                            fontSize: "2rem",
                            fontWeight: 900,
                            color: "white",
                        }}
                    >
                        {listing.crop_type}
                    </h2>
                </div>
            </div>

            {/* DETAILS SIDE */}
            <div
                style={{
                    padding: "34px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    {/* HEADER */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                width: "58px",
                                height: "58px",
                                borderRadius: "18px",
                                background:
                                    "linear-gradient(to right,#22c55e,#84cc16)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Leaf color="#020617" />
                        </div>

                        <div>
                            <h3
                                style={{
                                    fontSize: "1.8rem",
                                    fontWeight: 800,
                                    marginBottom: "6px",
                                }}
                            >
                                {listing.title}
                            </h3>

                            <p
                                style={{
                                    color: "#94a3b8",
                                }}
                            >
                                {t("marketplacePage.aiMarketplace")}
                            </p>
                        </div>
                    </div>

                    {/* INFO */}
                    <div
                        style={{
                            display: "grid",
                            gap: "18px",
                            marginTop: "30px",
                        }}
                    >
                        <div style={infoRow}>
                            <span style={labelStyle}>
                                <Package size={18} />
                                {t("marketplacePage.quantity")}
                            </span>

                            <span style={valueStyle}>
                                {listing.residue_quantity} Tons
                            </span>
                        </div>

                        <div style={infoRow}>
                            <span style={labelStyle}>
                                {t("marketplacePage.aiPrice")}
                            </span>

                            <span
                                className="gradient-text"
                                style={{
                                    fontWeight: 900,
                                    fontSize: "1.2rem",
                                }}
                            >
                                ₹
                                {listing.predicted_price_per_tonne}
                                /Ton
                            </span>
                        </div>

                        <div style={infoRow}>
                            <span style={labelStyle}>
                                {t("marketplacePage.totalValue")}
                            </span>

                            <span style={valueStyle}>
                                ₹{listing.total_listing_price}
                            </span>
                        </div>

                        <div style={infoRow}>
                            <span style={labelStyle}>
                                <Calendar size={18} />
                                {t("marketplacePage.pickupDate")}
                            </span>

                            <span style={valueStyle}>
                                {listing.pickup_date}
                            </span>
                        </div>
                    </div>
                </div>

                {/* BUTTON */}
                <Link
                    to={`/listing/${listing.id}`}
                    state={{ listing }}
                >
                    <button
                        style={{
                            width: "100%",
                            marginTop: "30px",
                            background:
                                "linear-gradient(to right,#22c55e,#84cc16)",
                            color: "#020617",
                            border: "none",
                            padding: "18px",
                            borderRadius: "18px",
                            fontWeight: 900,
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                    >
                        {t("marketplacePage.viewDetails")}
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "14px",
    borderBottom:
        "1px solid rgba(255,255,255,0.06)",
};

const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#94a3b8",
    fontWeight: 600,
};

const valueStyle = {
    color: "white",
    fontWeight: 800,
};

export default ListingCard;