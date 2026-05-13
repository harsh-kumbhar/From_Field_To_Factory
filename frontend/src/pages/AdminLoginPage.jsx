import { useState } from "react";

import { motion } from "framer-motion";

import { ShieldCheck, Lock } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { adminLogin } from "../services/api";

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setError("");

        try {
            const response =
                await adminLogin(formData);

            if (response.data.success) {
                localStorage.setItem(
                    "adminToken",
                    response.data.token
                );

                localStorage.setItem(
                    "admin",
                    JSON.stringify(
                        response.data.admin
                    )
                );

                navigate(
                    "/admin/dashboard"
                );
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Admin login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right,#020617,#071428,#020617)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* GLOWS */}
            <div
                style={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    background:
                        "rgba(34,197,94,0.15)",
                    borderRadius: "50%",
                    filter: "blur(140px)",
                    top: "-100px",
                    left: "-120px",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "400px",
                    height: "400px",
                    background:
                        "rgba(132,204,22,0.12)",
                    borderRadius: "50%",
                    filter: "blur(120px)",
                    bottom: "-100px",
                    right: "-100px",
                }}
            />

            {/* CARD */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="glass glow-green"
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    padding: "50px",
                    borderRadius: "32px",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {/* ICON */}
                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "24px",
                        background:
                            "linear-gradient(to right,#22c55e,#84cc16)",
                        display: "flex",
                        justifyContent:
                            "center",
                        alignItems: "center",
                        margin: "0 auto 30px",
                    }}
                >
                    <ShieldCheck
                        size={44}
                        color="#020617"
                    />
                </div>

                {/* TITLE */}
                <h1
                    className="gradient-text"
                    style={{
                        textAlign: "center",
                        fontSize: "3rem",
                        fontWeight: 900,
                        marginBottom: "12px",
                    }}
                >
                    Admin Portal
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginBottom: "40px",
                        lineHeight: 1.7,
                    }}
                >
                    Secure governance access
                    for Field-To-Factory
                    biomass moderation system.
                </p>

                {/* ERROR */}
                {error && (
                    <div
                        style={{
                            background:
                                "rgba(239,68,68,0.12)",
                            border:
                                "1px solid rgba(239,68,68,0.25)",
                            padding: "14px",
                            borderRadius: "16px",
                            marginBottom: "25px",
                            color: "#ef4444",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                >
                    {/* EMAIL */}
                    <div
                        style={{
                            marginBottom: "24px",
                        }}
                    >
                        <label
                            style={labelStyle}
                        >
                            Admin Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="admin@fieldtofactory.com"
                            value={formData.email}
                            onChange={
                                handleChange
                            }
                            required
                            style={inputStyle}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div
                        style={{
                            marginBottom: "32px",
                        }}
                    >
                        <label
                            style={labelStyle}
                        >
                            Password
                        </label>

                        <div
                            style={{
                                position:
                                    "relative",
                            }}
                        >
                            <Lock
                                size={18}
                                style={{
                                    position:
                                        "absolute",
                                    left: "18px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    color:
                                        "#94a3b8",
                                }}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter admin password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                style={{
                                    ...inputStyle,
                                    paddingLeft:
                                        "52px",
                                }}
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            background:
                                "linear-gradient(to right,#22c55e,#84cc16)",
                            border: "none",
                            padding:
                                "18px 20px",
                            borderRadius: "18px",
                            color: "#020617",
                            fontWeight: 900,
                            fontSize: "1rem",
                            cursor: "pointer",
                            boxShadow:
                                "0 0 30px rgba(34,197,94,0.35)",
                        }}
                    >
                        {loading
                            ? "Authenticating..."
                            : "Access Admin Dashboard"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontWeight: 700,
    color: "#e2e8f0",
};

const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border:
        "1px solid rgba(255,255,255,0.08)",
    background:
        "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "1rem",
};

export default AdminLoginPage;