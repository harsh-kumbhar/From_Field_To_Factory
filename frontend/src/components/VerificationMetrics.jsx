import { motion } from "framer-motion";

import {
    Leaf,
    Satellite,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const VerificationMetrics = ({
    verification,
}) => {
    if (!verification) return null;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(240px,1fr))",
                gap: "24px",
                marginTop: "30px",
            }}
        >
            <MetricCard
                title="NDVI"
                value={verification.ndvi}
                description="Vegetation Health Index"
                icon={<Leaf size={24} />}
            />

            <MetricCard
                title="NDTI"
                value={verification.ndti}
                description="Tillage Detection Index"
                icon={
                    <Satellite size={24} />
                }
            />

            <MetricCard
                title="BSI"
                value={verification.bsi}
                description="Bare Soil Index"
                icon={
                    <ShieldCheck size={24} />
                }
            />

            <MetricCard
                title="Confidence"
                value={
                    verification.verified
                        ? 92.4
                        : 41.8
                }
                suffix="%"
                description="AI Verification Confidence"
                icon={
                    <TrendingUp size={24} />
                }
            />
        </div>
    );
};

const MetricCard = ({
    title,
    value,
    description,
    icon,
    suffix = "",
}) => {
    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            className="glass glow-green"
            style={{
                padding: "30px",
                borderRadius: "28px",
                border:
                    "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* ICON */}
            <div
                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "18px",
                    background:
                        "linear-gradient(to right,#22c55e,#84cc16)",
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    color: "#020617",
                    marginBottom:
                        "22px",
                }}
            >
                {icon}
            </div>

            {/* TITLE */}
            <p
                style={{
                    color: "#94a3b8",
                    marginBottom:
                        "12px",
                    fontWeight: 600,
                    letterSpacing:
                        "0.4px",
                }}
            >
                {title}
            </p>

            {/* VALUE */}
            <h2
                className="gradient-text"
                style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    marginBottom:
                        "14px",
                }}
            >
                {typeof value ===
                    "number"
                    ? value.toFixed(3)
                    : value}
                {suffix}
            </h2>

            {/* DESCRIPTION */}
            <p
                style={{
                    color: "#64748b",
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                }}
            >
                {description}
            </p>
        </motion.div>
    );
};

export default VerificationMetrics;