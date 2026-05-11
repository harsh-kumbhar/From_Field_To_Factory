import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { registerBuyer } from "../services/api";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        company_name: "",
        contact_person: "",
        phone_number: "",
        gst_number: "",
        industry_location: "",
        bank_account_no: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await registerBuyer(formData);

            if (res.data.success) {
                navigate("/login");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed"
            );
        }

        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass glow-green"
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    borderRadius: "32px",
                    padding: "40px",
                }}
            >
                <h1
                    className="gradient-text"
                    style={{
                        fontSize: "3rem",
                        fontWeight: 900,
                        marginBottom: "14px",
                    }}
                >
                    Register Industry
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        marginBottom: "32px",
                    }}
                >
                    Create your biomass marketplace account
                </p>

                {error && (
                    <div
                        style={{
                            background: "rgba(255,0,0,0.1)",
                            color: "#ff6b6b",
                            padding: "14px",
                            borderRadius: "14px",
                            marginBottom: "20px",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(260px,1fr))",
                            gap: "20px",
                        }}
                    >
                        {[
                            {
                                name: "company_name",
                                placeholder: "Company Name",
                                type: "text",
                            },
                            {
                                name: "contact_person",
                                placeholder: "Contact Person Name",
                                type: "text",
                            },
                            {
                                name: "phone_number",
                                placeholder: "Phone Number",
                                type: "tel",
                            },
                            {
                                name: "gst_number",
                                placeholder: "GST Number",
                                type: "text",
                            },
                            {
                                name: "industry_location",
                                placeholder: "Industry Location",
                                type: "text",
                            },
                            {
                                name: "bank_account_no",
                                placeholder: "Bank Account Number",
                                type: "text",
                            },
                            {
                                name: "email",
                                placeholder: "Business Email Address",
                                type: "email",
                            },
                            {
                                name: "password",
                                placeholder: "Create Password",
                                type: "password",
                            },
                        ].map((field, index) => (
                            <input
                                key={index}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                required
                                value={formData[field.name]}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="glow-green"
                        style={{
                            ...buttonStyle,
                            marginTop: "28px",
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>
                </form>

                <p
                    style={{
                        marginTop: "24px",
                        color: "#94a3b8",
                        textAlign: "center",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#22c55e",
                            textDecoration: "none",
                            fontWeight: 700,
                        }}
                    >
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    outline: "none",
    fontSize: "1rem",
};

const buttonStyle = {
    width: "100%",
    background: "linear-gradient(to right,#22c55e,#84cc16)",
    color: "#020617",
    border: "none",
    padding: "18px",
    borderRadius: "16px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "1rem",
};

export default RegisterPage;