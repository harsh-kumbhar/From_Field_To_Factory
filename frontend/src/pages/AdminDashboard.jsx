import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    getAdminAnalytics,
} from "../services/api";

import AdminSidebar from "../components/AdminSidebar";
import AnalyticsCard from "../components/AnalyticsCard";

import {
    Database,
    ShoppingCart,
    Users,
    Wheat,
    ClipboardList,
    CheckCircle,
    Clock3,
    ShieldCheck,
    AlertTriangle,
    XCircle,
    Satellite,
    ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [analytics, setAnalytics] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const token =
            localStorage.getItem(
                "adminToken"
            );

        if (!token) {
            navigate("/admin/login");
            return;
        }

        fetchAnalytics();
    }, []);

    const fetchAnalytics =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getAdminAnalytics();

                if (
                    response.data.success
                ) {
                    setAnalytics(
                        response.data
                            .analytics
                    );
                }
            } catch (err) {
                console.log(
                    "ADMIN ANALYTICS ERROR:",
                    err.response?.data
                );

                console.log(
                    "STATUS:",
                    err.response?.status
                );

                console.log(
                    "RAW ERROR:",
                    err
                );

                if (
                    err.response?.status ===
                    401
                ) {
                    localStorage.removeItem(
                        "adminToken"
                    );

                    localStorage.removeItem(
                        "admin"
                    );

                    navigate(
                        "/admin/login"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "#020617",
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    color: "white",
                    fontSize: "1.2rem",
                }}
            >
                Loading Governance Dashboard...
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right,#020617,#071428,#020617)",
            }}
        >
            {/* SIDEBAR */}
            <AdminSidebar />

            {/* CONTENT */}
            <div
                style={{
                    flex: 1,
                    padding: "40px",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        marginBottom: "50px",
                    }}
                >
                    <h1
                        className="gradient-text"
                        style={{
                            fontSize: "3.2rem",
                            fontWeight: 900,
                            marginBottom:
                                "14px",
                        }}
                    >
                        AI Governance Center
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize:
                                "1.05rem",
                            maxWidth:
                                "800px",
                            lineHeight: 1.8,
                        }}
                    >
                        Enterprise biomass
                        marketplace operations,
                        satellite verification,
                        purchase governance,
                        and AI-powered
                        marketplace intelligence.
                    </p>
                </div>

                {/* ANALYTICS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "24px",
                        marginBottom:
                            "60px",
                    }}
                >
                    <AnalyticsCard
                        title="Total Listings"
                        value={
                            analytics?.total_listings ||
                            0
                        }
                        icon={
                            <Database color="#22c55e" />
                        }
                    />

                    <AnalyticsCard
                        title="Approved Listings"
                        value={
                            analytics?.approved_listings ||
                            0
                        }
                        icon={
                            <CheckCircle color="#22c55e" />
                        }
                    />

                    <AnalyticsCard
                        title="Pending Listings"
                        value={
                            analytics?.pending_listings ||
                            0
                        }
                        icon={
                            <Clock3 color="#f59e0b" />
                        }
                    />

                    <AnalyticsCard
                        title="Flagged Listings"
                        value={
                            analytics?.flagged_listings ||
                            0
                        }
                        icon={
                            <AlertTriangle color="#a855f7" />
                        }
                    />

                    <AnalyticsCard
                        title="Rejected Listings"
                        value={
                            analytics?.rejected_listings ||
                            0
                        }
                        icon={
                            <XCircle color="#ef4444" />
                        }
                    />

                    <AnalyticsCard
                        title="Sold Listings"
                        value={
                            analytics?.sold_listings ||
                            0
                        }
                        icon={
                            <ShoppingCart color="#06b6d4" />
                        }
                    />

                    <AnalyticsCard
                        title="Satellite Verified"
                        value={
                            analytics?.satellite_verified ||
                            0
                        }
                        icon={
                            <Satellite color="#84cc16" />
                        }
                    />

                    <AnalyticsCard
                        title="Pending Verification"
                        value={
                            analytics?.pending_verification ||
                            0
                        }
                        icon={
                            <ShieldCheck color="#facc15" />
                        }
                    />

                    <AnalyticsCard
                        title="Total Buyers"
                        value={
                            analytics?.total_buyers ||
                            0
                        }
                        icon={
                            <Users color="#84cc16" />
                        }
                    />

                    <AnalyticsCard
                        title="Total Farmers"
                        value={
                            analytics?.total_farmers ||
                            0
                        }
                        icon={
                            <Wheat color="#84cc16" />
                        }
                    />

                    <AnalyticsCard
                        title="Purchase Requests"
                        value={
                            analytics?.total_purchase_requests ||
                            0
                        }
                        icon={
                            <ClipboardList color="#a855f7" />
                        }
                    />
                </div>

                {/* OPERATIONS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(320px,1fr))",
                        gap: "28px",
                    }}
                >
                    {/* LISTINGS */}
                    <div
                        className="glass glow-green"
                        style={{
                            padding: "34px",
                            borderRadius:
                                "32px",
                            border:
                                "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "center",
                                marginBottom:
                                    "20px",
                            }}
                        >
                            <div
                                style={{
                                    width: "64px",
                                    height:
                                        "64px",
                                    borderRadius:
                                        "20px",
                                    background:
                                        "linear-gradient(to right,#22c55e,#84cc16)",
                                    display:
                                        "flex",
                                    justifyContent:
                                        "center",
                                    alignItems:
                                        "center",
                                }}
                            >
                                <Database color="#020617" />
                            </div>

                            <ArrowRight color="#94a3b8" />
                        </div>

                        <h2
                            style={{
                                fontSize:
                                    "1.8rem",
                                fontWeight: 800,
                                marginBottom:
                                    "14px",
                            }}
                        >
                            Listing Moderation
                        </h2>

                        <p
                            style={{
                                color:
                                    "#94a3b8",
                                lineHeight: 1.8,
                                marginBottom:
                                    "28px",
                            }}
                        >
                            Review marketplace
                            biomass listings,
                            verification status,
                            AI pricing, and
                            satellite intelligence.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/listings"
                                )
                            }
                            style={
                                buttonStyle
                            }
                        >
                            Open Moderation
                            Center
                        </button>
                    </div>

                    {/* PURCHASES */}
                    <div
                        className="glass glow-green"
                        style={{
                            padding: "34px",
                            borderRadius:
                                "32px",
                            border:
                                "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "center",
                                marginBottom:
                                    "20px",
                            }}
                        >
                            <div
                                style={{
                                    width: "64px",
                                    height:
                                        "64px",
                                    borderRadius:
                                        "20px",
                                    background:
                                        "linear-gradient(to right,#06b6d4,#3b82f6)",
                                    display:
                                        "flex",
                                    justifyContent:
                                        "center",
                                    alignItems:
                                        "center",
                                }}
                            >
                                <ShoppingCart color="#020617" />
                            </div>

                            <ArrowRight color="#94a3b8" />
                        </div>

                        <h2
                            style={{
                                fontSize:
                                    "1.8rem",
                                fontWeight: 800,
                                marginBottom:
                                    "14px",
                            }}
                        >
                            Purchase Governance
                        </h2>

                        <p
                            style={{
                                color:
                                    "#94a3b8",
                                lineHeight: 1.8,
                                marginBottom:
                                    "28px",
                            }}
                        >
                            Monitor biomass
                            procurement requests,
                            buyer activities,
                            transactions, and
                            marketplace demand.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/purchases"
                                )
                            }
                            style={
                                buttonStyle
                            }
                        >
                            Open Purchase Center
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const buttonStyle = {
    width: "100%",
    background:
        "linear-gradient(to right,#22c55e,#84cc16)",
    border: "none",
    padding: "16px",
    borderRadius: "18px",
    color: "#020617",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "1rem",
};

export default AdminDashboard;