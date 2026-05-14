import { motion, AnimatePresence } from "framer-motion";

import {
    X,
    ShieldCheck,
    ShieldAlert,
    Satellite,
    Leaf,
    Image as ImageIcon,
} from "lucide-react";

const VerificationModal = ({
    open,
    onClose,
    verification,
    loading,
}) => {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                style={{
                    position: "fixed",
                    inset: 0,
                    background:
                        "rgba(0,0,0,0.8)",
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems: "center",
                    zIndex: 9999,
                    padding: "20px",
                    backdropFilter:
                        "blur(10px)",
                }}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="glass glow-green"
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                        maxHeight: "92vh",
                        overflowY: "auto",
                        borderRadius: "36px",
                        padding: "40px",
                        position: "relative",
                    }}
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "24px",
                            width: "46px",
                            height: "46px",
                            borderRadius: "14px",
                            border: "none",
                            background:
                                "rgba(255,255,255,0.08)",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                        }}
                    >
                        <X size={22} />
                    </button>

                    {/* HEADER */}
                    <div
                        style={{
                            marginBottom: "40px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: "16px",
                                marginBottom:
                                    "18px",
                            }}
                        >
                            <div
                                style={{
                                    width: "72px",
                                    height: "72px",
                                    borderRadius:
                                        "24px",
                                    background:
                                        verification?.verified
                                            ? "linear-gradient(to right,#22c55e,#84cc16)"
                                            : "linear-gradient(to right,#ef4444,#f97316)",
                                    display:
                                        "flex",
                                    justifyContent:
                                        "center",
                                    alignItems:
                                        "center",
                                }}
                            >
                                {verification?.verified ? (
                                    <ShieldCheck
                                        color="#020617"
                                        size={
                                            34
                                        }
                                    />
                                ) : (
                                    <ShieldAlert
                                        color="#020617"
                                        size={
                                            34
                                        }
                                    />
                                )}
                            </div>

                            <div>
                                <h1
                                    className="gradient-text"
                                    style={{
                                        fontSize:
                                            "3rem",
                                        fontWeight: 900,
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    Satellite
                                    Verification
                                </h1>

                                <p
                                    style={{
                                        color:
                                            "#94a3b8",
                                        fontSize:
                                            "1.05rem",
                                    }}
                                >
                                    AI-powered
                                    Earth Engine
                                    biomass
                                    analysis
                                </p>
                            </div>
                        </div>

                        {/* STATUS */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems:
                                    "center",
                                gap: "12px",
                                padding:
                                    "14px 22px",
                                borderRadius:
                                    "999px",
                                background:
                                    verification?.verified
                                        ? "rgba(34,197,94,0.16)"
                                        : "rgba(239,68,68,0.16)",
                                border:
                                    verification?.verified
                                        ? "1px solid rgba(34,197,94,0.3)"
                                        : "1px solid rgba(239,68,68,0.3)",
                                color:
                                    verification?.verified
                                        ? "#22c55e"
                                        : "#ef4444",
                                fontWeight: 800,
                                fontSize:
                                    "1rem",
                            }}
                        >
                            {verification?.verified ? (
                                <>
                                    <ShieldCheck
                                        size={
                                            20
                                        }
                                    />
                                    VERIFIED
                                    BIOMASS
                                    DETECTED
                                </>
                            ) : (
                                <>
                                    <ShieldAlert
                                        size={
                                            20
                                        }
                                    />
                                    LOW
                                    BIOMASS
                                    CONFIDENCE
                                </>
                            )}
                        </div>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div
                            style={{
                                padding:
                                    "80px 20px",
                                textAlign:
                                    "center",
                            }}
                        >
                            <h2
                                className="gradient-text"
                                style={{
                                    fontSize:
                                        "2rem",
                                }}
                            >
                                Processing
                                satellite
                                imagery...
                            </h2>
                        </div>
                    ) : (
                        <>
                            {/* METRICS */}
                            <div
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit,minmax(240px,1fr))",
                                    gap: "24px",
                                    marginBottom:
                                        "40px",
                                }}
                            >
                                <MetricCard
                                    title="NDVI"
                                    value={
                                        verification?.ndvi ??
                                        "N/A"
                                    }
                                    subtitle="Vegetation Index"
                                    icon={
                                        <Leaf />
                                    }
                                />

                                <MetricCard
                                    title="NDTI"
                                    value={
                                        verification?.ndti ??
                                        "N/A"
                                    }
                                    subtitle="Tillage Index"
                                    icon={
                                        <Satellite />
                                    }
                                />

                                <MetricCard
                                    title="BSI"
                                    value={
                                        verification?.bsi ??
                                        "N/A"
                                    }
                                    subtitle="Bare Soil Index"
                                    icon={
                                        <ShieldCheck />
                                    }
                                />
                            </div>

                            {/* IMAGES */}
                            <div
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit,minmax(420px,1fr))",
                                    gap: "30px",
                                    marginBottom:
                                        "40px",
                                }}
                            >
                                {/* SATELLITE IMAGE */}
                                <div
                                    className="glass"
                                    style={{
                                        borderRadius:
                                            "30px",
                                        overflow:
                                            "hidden",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding:
                                                "24px",
                                            borderBottom:
                                                "1px solid rgba(255,255,255,0.06)",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <Satellite color="#22c55e" />

                                        <h2
                                            style={{
                                                fontSize:
                                                    "1.5rem",
                                                fontWeight: 800,
                                            }}
                                        >
                                            Satellite
                                            View
                                        </h2>
                                    </div>

                                    <div
                                        style={{
                                            height:
                                                "360px",
                                            background:
                                                "#0f172a",
                                        }}
                                    >
                                        {verification?.satellite_thumbnail ? (
                                            <img
                                                src={
                                                    verification.satellite_thumbnail
                                                }
                                                alt="Satellite View"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit:
                                                        "cover",
                                                }}
                                            />
                                        ) : (
                                            <EmptyImage />
                                        )}
                                    </div>
                                </div>

                                {/* NDVI IMAGE */}
                                <div
                                    className="glass"
                                    style={{
                                        borderRadius:
                                            "30px",
                                        overflow:
                                            "hidden",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding:
                                                "24px",
                                            borderBottom:
                                                "1px solid rgba(255,255,255,0.06)",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <Leaf color="#84cc16" />

                                        <h2
                                            style={{
                                                fontSize:
                                                    "1.5rem",
                                                fontWeight: 800,
                                            }}
                                        >
                                            NDVI
                                            Heatmap
                                        </h2>
                                    </div>

                                    <div
                                        style={{
                                            height:
                                                "360px",
                                            background:
                                                "#0f172a",
                                        }}
                                    >
                                        {verification?.ndvi_thumbnail ? (
                                            <img
                                                src={
                                                    verification.ndvi_thumbnail
                                                }
                                                alt="NDVI Heatmap"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit:
                                                        "cover",
                                                }}
                                            />
                                        ) : (
                                            <EmptyImage />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SUMMARY */}
                            <div
                                className="glass"
                                style={{
                                    padding:
                                        "36px",
                                    borderRadius:
                                        "30px",
                                    border:
                                        verification?.verified
                                            ? "1px solid rgba(34,197,94,0.2)"
                                            : "1px solid rgba(239,68,68,0.2)",
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize:
                                            "2rem",
                                        marginBottom:
                                            "20px",
                                        fontWeight: 800,
                                    }}
                                >
                                    AI Verification
                                    Summary
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#cbd5e1",
                                        lineHeight:
                                            1.9,
                                        fontSize:
                                            "1.05rem",
                                    }}
                                >
                                    {verification?.verified
                                        ? "Satellite analysis indicates strong biomass presence with healthy vegetation signatures detected across the field region. NDVI and soil metrics suggest valid agricultural residue availability."
                                        : "Satellite analysis indicates weak biomass confidence or insufficient vegetation patterns. Further manual review may be required before approving this listing."}
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const MetricCard = ({
    title,
    value,
    subtitle,
    icon,
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
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    marginBottom:
                        "22px",
                    color: "#020617",
                }}
            >
                {icon}
            </div>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom:
                        "10px",
                }}
            >
                {title}
            </p>

            <h2
                className="gradient-text"
                style={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    marginBottom:
                        "10px",
                }}
            >
                {typeof value ===
                    "number"
                    ? value.toFixed(3)
                    : value}
            </h2>

            <p
                style={{
                    color: "#64748b",
                    fontSize: "0.95rem",
                }}
            >
                {subtitle}
            </p>
        </motion.div>
    );
};

const EmptyImage = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection:
                    "column",
                justifyContent:
                    "center",
                alignItems:
                    "center",
                gap: "16px",
                color: "#64748b",
            }}
        >
            <ImageIcon size={54} />

            <p>No Image Available</p>
        </div>
    );
};

export default VerificationModal;