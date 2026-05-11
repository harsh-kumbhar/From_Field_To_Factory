import {
    useEffect,
    useState,
} from "react";

import { motion } from "framer-motion";

import {
    ClipboardList,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import RequestCard from "../components/RequestCard";

import {
    getMyRequests,
} from "../services/api";

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

const MyRequestsPage = () => {
    const { t } = useTranslation();

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);

            const response =
                await getMyRequests();

            console.log(response.data);

            setRequests(
                response.data.requests || []
            );
        } catch (err) {
            console.error(err);

            setError(
                "Failed To Load Requests"
            );
        }

        setLoading(false);
    };

    return (
        <div
            style={{
                background: "#020617",
                minHeight: "100vh",
                color: "white",
            }}
        >
            <Navbar />

            <div
                className="main-container"
                style={{
                    paddingTop: "140px",
                    paddingBottom: "100px",
                }}
            >
                {/* HERO */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="glass glow-green"
                    style={{
                        padding: "60px",
                        borderRadius: "36px",
                        marginBottom: "50px",
                        textAlign: "center",
                    }}
                >
                    <ClipboardList
                        size={56}
                        color="#84cc16"
                        style={{
                            marginBottom: "24px",
                        }}
                    />

                    <h1
                        className="gradient-text"
                        style={{
                            fontSize:
                                "clamp(3rem,6vw,5rem)",
                            fontWeight: 900,
                            marginBottom: "20px",
                        }}
                    >
                        {t("purchase.myRequests")}
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "1.1rem",
                            maxWidth: "700px",
                            margin: "0 auto",
                            lineHeight: 1.8,
                        }}
                    >
                        {t(
                            "purchase.requestInsights"
                        )}
                    </p>
                </motion.div>

                {/* LOADING */}
                {loading && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "80px 0",
                        }}
                    >
                        <h2
                            className="gradient-text"
                            style={{
                                fontSize: "2rem",
                            }}
                        >
                            Loading Requests...
                        </h2>
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div
                        className="glass"
                        style={{
                            padding: "40px",
                            borderRadius: "28px",
                            textAlign: "center",
                            color: "#ef4444",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    requests.length === 0 && (
                        <div
                            className="glass"
                            style={{
                                padding: "70px",
                                borderRadius: "32px",
                                textAlign: "center",
                            }}
                        >
                            <h2
                                style={{
                                    marginBottom: "20px",
                                    fontSize: "2rem",
                                }}
                            >
                                {t(
                                    "purchase.noRequests"
                                )}
                            </h2>

                            <Link to="/marketplace">
                                <button
                                    style={{
                                        background:
                                            "linear-gradient(to right,#22c55e,#84cc16)",
                                        color: "#020617",
                                        border: "none",
                                        padding:
                                            "16px 28px",
                                        borderRadius:
                                            "16px",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                    }}
                                >
                                    {t(
                                        "purchase.viewMarketplace"
                                    )}
                                </button>
                            </Link>
                        </div>
                    )}

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(340px,1fr))",
                        gap: "30px",
                    }}
                >
                    {requests.map(
                        (request) => (
                            <RequestCard
                                key={request.id}
                                request={request}
                            />
                        )
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MyRequestsPage;