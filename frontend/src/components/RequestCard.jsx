import { motion } from "framer-motion";

import {
    Calendar,
    IndianRupee,
    Leaf,
} from "lucide-react";

const RequestCard = ({ request }) => {
    const imageUrl = request.image_path
        ? `${import.meta.env.VITE_STORAGE_BUCKET_URL}${request.image_path}`
        : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";

    const getStatusColor = () => {
        switch (request.deal_status) {
            case "accepted":
                return "#22c55e";

            case "rejected":
                return "#ef4444";

            default:
                return "#f59e0b";
        }
    };

    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            className="glass glow-green"
            style={{
                borderRadius: "28px",
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
                    alt={request.crop_type}
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
                        background: getStatusColor(),
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        marginBottom: "18px",
                        textTransform: "capitalize",
                    }}
                >
                    {request.deal_status}
                </div>

                {/* TITLE */}
                <h2
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 800,
                        marginBottom: "20px",
                    }}
                >
                    {request.crop_type} Biomass
                </h2>

                {/* DETAILS */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <InfoRow
                        icon={
                            <Leaf size={18} />
                        }
                        label="Quantity"
                        value={`${request.residue_quantity} Tons`}
                    />

                    <InfoRow
                        icon={
                            <IndianRupee size={18} />
                        }
                        label="Total Value"
                        value={`₹${request.total_amount}`}
                    />

                    <InfoRow
                        icon={
                            <Calendar size={18} />
                        }
                        label="Requested On"
                        value={new Date(
                            request.created_at
                        ).toLocaleDateString()}
                    />
                </div>

                {/* MESSAGE */}
                {request.buyer_message && (
                    <div
                        style={{
                            marginTop: "24px",
                            padding: "18px",
                            borderRadius: "18px",
                            background:
                                "rgba(255,255,255,0.04)",
                            border:
                                "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <p
                            style={{
                                color: "#94a3b8",
                                marginBottom: "8px",
                                fontWeight: 600,
                            }}
                        >
                            Buyer Message
                        </p>

                        <p
                            style={{
                                lineHeight: 1.7,
                                color: "#e2e8f0",
                            }}
                        >
                            {request.buyer_message}
                        </p>
                    </div>
                )}
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

export default RequestCard;