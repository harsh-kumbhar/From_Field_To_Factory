import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const IndustryDashboard = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* BACKGROUND GLOW */}
            <div
                style={{
                    position: "absolute",
                    top: "-100px",
                    right: "-100px",
                    width: "400px",
                    height: "400px",
                    background: "rgba(34,197,94,0.12)",
                    filter: "blur(120px)",
                    borderRadius: "50%",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass glow-green"
                style={{
                    maxWidth: "1100px",
                    margin: "80px auto",
                    borderRadius: "36px",
                    padding: "50px",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginBottom: "50px",
                    }}
                >
                    <div>
                        <p
                            style={{
                                color: "#84cc16",
                                fontWeight: 700,
                                marginBottom: "14px",
                            }}
                        >
                            INDUSTRY DASHBOARD
                        </p>

                        <h1
                            className="gradient-text"
                            style={{
                                fontSize: "3.5rem",
                                fontWeight: 900,
                                lineHeight: 1.1,
                                marginBottom: "12px",
                            }}
                        >
                            Welcome Back
                        </h1>

                        <p
                            style={{
                                color: "#94a3b8",
                                fontSize: "1.1rem",
                            }}
                        >
                            {user?.company_name}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/marketplace")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "16px 28px",
                            borderRadius: "18px",
                            fontWeight: 700,
                            cursor: "pointer",
                            marginRight: "14px",
                        }}
                    >
                        Open Marketplace
                    </button>
                    <Link to="/my-requests">
                        <motion.button
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            style={{
                                background:
                                    "linear-gradient(to right,#22c55e,#84cc16)",
                                color: "#020617",
                                border: "none",
                                padding: "18px 28px",
                                borderRadius: "18px",
                                fontWeight: 800,
                                cursor: "pointer",
                                marginLeft: "16px",
                            }}
                        >
                            My Requests
                        </motion.button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            background:
                                "linear-gradient(to right,#22c55e,#84cc16)",
                            color: "#020617",
                            border: "none",
                            padding: "16px 28px",
                            borderRadius: "18px",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        Logout
                    </button>
                </div>


                {/* DASHBOARD CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "24px",
                    }}
                >
                    {[
                        ["Verified Suppliers", "320+"],
                        ["Biomass Requests", "84"],
                        ["Marketplace Volume", "12K Tons"],
                        ["Satellite Verified", "98%"],
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8 }}
                            className="glass"
                            style={{
                                borderRadius: "28px",
                                padding: "32px",
                            }}
                        >
                            <p
                                style={{
                                    color: "#94a3b8",
                                    marginBottom: "14px",
                                }}
                            >
                                {item[0]}
                            </p>

                            <h2
                                className="gradient-text"
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 900,
                                }}
                            >
                                {item[1]}
                            </h2>
                        </motion.div>
                    ))}
                </div>

                {/* PLACEHOLDER */}
                <div
                    className="glass"
                    style={{
                        marginTop: "40px",
                        borderRadius: "30px",
                        padding: "40px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            marginBottom: "20px",
                        }}
                    >
                        Marketplace Integration Coming Soon
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                            lineHeight: 1.9,
                            maxWidth: "800px",
                        }}
                    >
                        This dashboard will soon provide access to verified
                        biomass listings, AI-powered pricing analytics,
                        supplier verification, industrial procurement flows,
                        and satellite intelligence systems.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default IndustryDashboard;