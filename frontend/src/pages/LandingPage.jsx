import { motion } from "framer-motion";
import {
    Brain,
    Satellite,
    Factory,
    Leaf,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const features = [
    {
        title: "AI Pricing Engine",
        icon: Brain,
        desc: "Dynamic biomass pricing using moisture, regional demand, and quality intelligence.",
    },
    {
        title: "Satellite Verification",
        icon: Satellite,
        desc: "Sentinel-2 satellite verification for transparent biomass validation.",
    },
    {
        title: "Industry Marketplace",
        icon: Factory,
        desc: "Connect farmers directly with verified industrial biomass buyers.",
    },
];

const marketplace = [
    {
        crop: "Rice Stubble",
        qty: "120 Tons",
        location: "Punjab",
        price: "₹2,800/Ton",
    },
    {
        crop: "Wheat Residue",
        qty: "80 Tons",
        location: "Haryana",
        price: "₹2,100/Ton",
    },
    {
        crop: "Sugarcane Waste",
        qty: "150 Tons",
        location: "Maharashtra",
        price: "₹3,200/Ton",
    },
];

const LandingPage = () => {
    const { t } = useTranslation();

    return (
        <div
            style={{
                background: "#020617",
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Navbar />

            {/* BACKGROUND GLOWS */}
            <div
                style={{
                    position: "absolute",
                    top: "-120px",
                    left: "-120px",
                    width: "500px",
                    height: "500px",
                    background: "rgba(34,197,94,0.12)",
                    filter: "blur(140px)",
                    borderRadius: "50%",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    right: "-100px",
                    top: "300px",
                    width: "400px",
                    height: "400px",
                    background: "rgba(132,204,22,0.10)",
                    filter: "blur(120px)",
                    borderRadius: "50%",
                }}
            />

            {/* HERO SECTION */}
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "120px",
                    paddingBottom: "100px",
                    position: "relative",
                }}
            >
                <div className="main-container">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.1fr 0.9fr",
                            gap: "80px",
                            alignItems: "center",
                        }}
                        className="hero-grid"
                    >
                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <p
                                style={{
                                    color: "#84cc16",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    marginBottom: "22px",
                                }}
                            >
                                AI-POWERED CLIMATE TECH PLATFORM
                            </p>

                            <h1
                                className="gradient-text"
                                style={{
                                    fontSize: "clamp(3rem, 7vw, 6rem)",
                                    lineHeight: 1.05,
                                    fontWeight: 900,
                                    marginBottom: "30px",
                                }}
                            >
                                {t("heroTitle")}
                            </h1>

                            <p
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "1.15rem",
                                    lineHeight: 1.9,
                                    maxWidth: "700px",
                                    marginBottom: "42px",
                                }}
                            >
                                {t("heroSubtitle")}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "18px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <button
                                    className="glow-green"
                                    style={{
                                        background:
                                            "linear-gradient(to right,#22c55e,#84cc16)",
                                        color: "#020617",
                                        border: "none",
                                        padding: "18px 32px",
                                        borderRadius: "18px",
                                        fontWeight: 800,
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    {t("explore")}
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    className="glass"
                                    style={{
                                        border: "none",
                                        padding: "18px 32px",
                                        borderRadius: "18px",
                                        color: "white",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                    }}
                                >
                                    {t("technology")}
                                </button>
                            </div>
                        </motion.div>

                        {/* RIGHT ANALYTICS CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div
                                className="glass glow-green"
                                style={{
                                    borderRadius: "36px",
                                    padding: "36px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div>
                                        <p style={{ color: "#94a3b8" }}>
                                            Live Intelligence
                                        </p>

                                        <h2
                                            style={{
                                                fontSize: "2rem",
                                                fontWeight: 800,
                                                marginTop: "10px",
                                            }}
                                        >
                                            Biomass Analytics
                                        </h2>
                                    </div>

                                    <ShieldCheck color="#22c55e" size={34} />
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "18px",
                                    }}
                                >
                                    {[
                                        ["Verified Fields", "12,450+"],
                                        ["CO₂ Prevented", "82K Tons"],
                                        ["Active Industries", "320+"],
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: "24px",
                                                borderRadius: "24px",
                                                background: "rgba(255,255,255,0.04)",
                                                border:
                                                    "1px solid rgba(255,255,255,0.06)",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "#94a3b8",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                {item[0]}
                                            </p>

                                            <h3
                                                className="gradient-text"
                                                style={{
                                                    fontSize: "2.3rem",
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {item[1]}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section
                id="features"
                style={{
                    paddingTop: "100px",
                    paddingBottom: "120px",
                }}
            >
                <div className="main-container">
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "70px",
                        }}
                    >
                        <p
                            style={{
                                color: "#84cc16",
                                marginBottom: "16px",
                                fontWeight: 600,
                            }}
                        >
                            PLATFORM CAPABILITIES
                        </p>

                        <h2
                            style={{
                                fontSize: "clamp(2.5rem,5vw,4rem)",
                                fontWeight: 900,
                            }}
                        >
                            {t("features")}
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "28px",
                        }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={index}
                                className="glass"
                                style={{
                                    borderRadius: "30px",
                                    padding: "36px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "74px",
                                        height: "74px",
                                        borderRadius: "22px",
                                        background: "rgba(34,197,94,0.12)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "28px",
                                    }}
                                >
                                    <feature.icon size={34} color="#22c55e" />
                                </div>

                                <h3
                                    style={{
                                        fontSize: "1.7rem",
                                        fontWeight: 800,
                                        marginBottom: "18px",
                                    }}
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    style={{
                                        color: "#94a3b8",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                style={{
                    paddingBottom: "120px",
                }}
            >
                <div className="main-container">
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "70px",
                        }}
                    >
                        <p
                            style={{
                                color: "#84cc16",
                                marginBottom: "16px",
                                fontWeight: 600,
                            }}
                        >
                            PROCESS FLOW
                        </p>

                        <h2
                            style={{
                                fontSize: "clamp(2.5rem,5vw,4rem)",
                                fontWeight: 900,
                            }}
                        >
                            {t("how")}
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap: "24px",
                        }}
                    >
                        {[
                            "Farmer Maps Field",
                            "AI Pricing",
                            "Satellite Verification",
                            "Industry Marketplace",
                        ].map((step, index) => (
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                key={index}
                                className="glass"
                                style={{
                                    borderRadius: "30px",
                                    padding: "36px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        margin: "0 auto 24px",
                                        borderRadius: "50%",
                                        background: "rgba(34,197,94,0.12)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#22c55e",
                                        fontSize: "1.4rem",
                                        fontWeight: 800,
                                    }}
                                >
                                    {index + 1}
                                </div>

                                <h3
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    {step}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MARKETPLACE */}
            <section
                id="marketplace"
                style={{
                    paddingBottom: "120px",
                }}
            >
                <div className="main-container">
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "70px",
                        }}
                    >
                        <p
                            style={{
                                color: "#84cc16",
                                marginBottom: "16px",
                                fontWeight: 600,
                            }}
                        >
                            VERIFIED BIOMASS NETWORK
                        </p>

                        <h2
                            style={{
                                fontSize: "clamp(2.5rem,5vw,4rem)",
                                fontWeight: 900,
                            }}
                        >
                            {t("marketplace")}
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(320px,1fr))",
                            gap: "28px",
                        }}
                    >
                        {marketplace.map((item, index) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={index}
                                className="glass"
                                style={{
                                    borderRadius: "30px",
                                    padding: "34px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "28px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "18px",
                                            background: "rgba(34,197,94,0.12)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Leaf color="#22c55e" />
                                    </div>

                                    <span
                                        style={{
                                            background: "rgba(34,197,94,0.12)",
                                            color: "#22c55e",
                                            padding: "10px 16px",
                                            borderRadius: "999px",
                                            fontWeight: 700,
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Verified
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontSize: "1.8rem",
                                        fontWeight: 800,
                                        marginBottom: "24px",
                                    }}
                                >
                                    {item.crop}
                                </h3>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "14px",
                                        color: "#cbd5e1",
                                    }}
                                >
                                    <p>Quantity: {item.qty}</p>
                                    <p>Location: {item.location}</p>

                                    <h4
                                        className="gradient-text"
                                        style={{
                                            fontSize: "1.8rem",
                                            fontWeight: 900,
                                            marginTop: "10px",
                                        }}
                                    >
                                        {item.price}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMPACT */}
            <section
                id="impact"
                style={{
                    paddingBottom: "120px",
                }}
            >
                <div className="main-container">
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "70px",
                        }}
                    >
                        <p
                            style={{
                                color: "#84cc16",
                                marginBottom: "16px",
                                fontWeight: 600,
                            }}
                        >
                            MEASURABLE IMPACT
                        </p>

                        <h2
                            style={{
                                fontSize: "clamp(2.5rem,5vw,4rem)",
                                fontWeight: 900,
                            }}
                        >
                            {t("impact")}
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap: "24px",
                        }}
                    >
                        {[
                            ["12K+", "Farmers Onboarded"],
                            ["80K", "Tons Processed"],
                            ["50K+", "CO₂ Reduced"],
                            ["14K+", "Verified Fields"],
                        ].map((item, index) => (
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                key={index}
                                className="glass"
                                style={{
                                    borderRadius: "30px",
                                    padding: "40px 28px",
                                    textAlign: "center",
                                }}
                            >
                                <h3
                                    className="gradient-text"
                                    style={{
                                        fontSize: "3.5rem",
                                        fontWeight: 900,
                                        marginBottom: "16px",
                                    }}
                                >
                                    {item[0]}
                                </h3>

                                <p
                                    style={{
                                        color: "#94a3b8",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {item[1]}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                style={{
                    paddingBottom: "120px",
                }}
            >
                <div className="main-container">
                    <div
                        className="glass glow-green"
                        style={{
                            borderRadius: "40px",
                            padding: "80px 40px",
                            textAlign: "center",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "clamp(3rem,6vw,5rem)",
                                fontWeight: 900,
                                marginBottom: "24px",
                            }}
                        >
                            {t("cta")}
                        </h2>

                        <p
                            style={{
                                color: "#94a3b8",
                                maxWidth: "700px",
                                margin: "0 auto 40px",
                                lineHeight: 1.8,
                                fontSize: "1.1rem",
                            }}
                        >
                            Build the future of sustainable biomass trade using
                            AI-driven pricing and satellite intelligence.
                        </p>

                        <button
                            className="glow-green"
                            style={{
                                background:
                                    "linear-gradient(to right,#22c55e,#84cc16)",
                                color: "#020617",
                                border: "none",
                                padding: "18px 34px",
                                borderRadius: "18px",
                                fontWeight: 800,
                                fontSize: "1rem",
                                cursor: "pointer",
                            }}
                        >
                            Explore Platform
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;