import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { i18n } = useTranslation();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 999,
                padding: "22px 0",
            }}
        >
            <div className="main-container">
                <div
                    className="glass"
                    style={{
                        borderRadius: "24px",
                        padding: "18px 32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    {/* LOGO */}
                    <Link
                        to="/"
                        className="gradient-text"
                        style={{
                            fontSize: "2rem",
                            fontWeight: 900,
                            textDecoration: "none",
                        }}
                    >
                        Field-To-Factory
                    </Link>


                    {/* NAV LINKS */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "34px",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="#features" style={navLinkStyle}>
                            Features
                        </a>

                        <a href="#marketplace" style={navLinkStyle}>
                            Marketplace
                        </a>

                        <a href="#impact" style={navLinkStyle}>
                            Impact
                        </a>
                    </div>
                    <Link to="/admin/login">
                        <button style={navLinkStyle}>
                            Admin
                        </button>
                    </Link>

                    {/* RIGHT SECTION */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* LANGUAGE */}
                        {[
                            ["EN", "en"],
                            ["हिं", "hi"],
                            ["मर", "mr"],
                        ].map((lang, index) => (
                            <button
                                key={index}
                                onClick={() => i18n.changeLanguage(lang[1])}
                                style={langButtonStyle}
                            >
                                {lang[0]}
                            </button>
                        ))}

                        {/* AUTH */}
                        {!token ? (
                            <>
                                <Link to="/login">
                                    <button style={secondaryButton}>
                                        Login
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button style={primaryButton}>
                                        Register
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard">
                                    <button style={secondaryButton}>
                                        Dashboard
                                    </button>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    style={primaryButton}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const navLinkStyle = {
    color: "#f1f5f9",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
};

const langButtonStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
};

const primaryButton = {
    background: "linear-gradient(to right,#22c55e,#84cc16)",
    color: "#020617",
    border: "none",
    padding: "12px 20px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
};

const secondaryButton = {
    background: "rgba(255,255,255,0.05)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "12px 20px",
    borderRadius: "14px",
    fontWeight: 700,
    cursor: "pointer",
};

export default Navbar;