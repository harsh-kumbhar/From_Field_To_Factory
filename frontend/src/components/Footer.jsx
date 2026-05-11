import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer
            style={{
                padding: "40px 0 60px",
            }}
        >
            <div className="main-container">
                <div
                    className="glass"
                    style={{
                        borderRadius: "36px",
                        padding: "50px 40px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "50px",
                        }}
                    >
                        {/* LEFT SECTION */}
                        <div>
                            <h2
                                className="gradient-text"
                                style={{
                                    fontSize: "2.2rem",
                                    fontWeight: 900,
                                    marginBottom: "18px",
                                }}
                            >
                                Field-To-Factory
                            </h2>

                            <p
                                style={{
                                    color: "#94a3b8",
                                    lineHeight: 1.8,
                                    marginBottom: "22px",
                                    maxWidth: "420px",
                                }}
                            >
                                AI-powered biomass intelligence platform transforming
                                agricultural residue into a verified industrial economy
                                using satellite verification and smart pricing systems.
                            </p>

                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    background: "rgba(34,197,94,0.1)",
                                    border: "1px solid rgba(34,197,94,0.15)",
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                }}
                            >
                                <span
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        background: "#22c55e",
                                        boxShadow: "0 0 15px #22c55e",
                                    }}
                                />

                                <span
                                    style={{
                                        color: "#22c55e",
                                        fontWeight: 700,
                                    }}
                                >
                                    Built By Team Green Guardians
                                </span>
                            </div>
                        </div>

                        {/* CENTER SECTION */}
                        <div>
                            <h3
                                style={{
                                    fontSize: "1.3rem",
                                    fontWeight: 800,
                                    marginBottom: "24px",
                                }}
                            >
                                Quick Links
                            </h3>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                }}
                            >
                                {[
                                    ["Features", "#features"],
                                    ["Marketplace", "#marketplace"],
                                    ["Impact", "#impact"],
                                ].map((item, index) => (
                                    <a
                                        key={index}
                                        href={item[1]}
                                        style={{
                                            color: "#cbd5e1",
                                            textDecoration: "none",
                                            transition: "0.3s",
                                            width: "fit-content",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = "#22c55e";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = "#cbd5e1";
                                        }}
                                    >
                                        {item[0]}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div>
                            <h3
                                style={{
                                    fontSize: "1.3rem",
                                    fontWeight: 800,
                                    marginBottom: "24px",
                                }}
                            >
                                Contact
                            </h3>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "18px",
                                }}
                            >
                                {/* EMAIL */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        color: "#cbd5e1",
                                    }}
                                >
                                    <Mail size={20} color="#22c55e" />

                                    <span>
                                        harsh.kumbhar@vit.edu.in
                                    </span>
                                </div>

                                {/* PHONE */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        color: "#cbd5e1",
                                    }}
                                >
                                    <Phone size={20} color="#22c55e" />

                                    <span>
                                        +91 8850 73324
                                    </span>
                                </div>

                                {/* LOCATION */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        color: "#cbd5e1",
                                    }}
                                >
                                    <MapPin size={20} color="#22c55e" />

                                    <span>
                                        India
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div
                        style={{
                            marginTop: "50px",
                            paddingTop: "28px",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "20px",
                        }}
                    >
                        <p
                            style={{
                                color: "#64748b",
                            }}
                        >
                            © 2026 Field-To-Factory. All rights reserved.
                        </p>

                        <p
                            style={{
                                color: "#64748b",
                            }}
                        >
                            AI • Satellite Intelligence • Biomass Marketplace
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;