import { useEffect, useState } from "react";

import {
    getAdminAnalytics,
    getAdminListings,
    updateListingStatus,
} from "../services/api";

import AdminSidebar from "../components/AdminSidebar";

import AnalyticsCard from "../components/AnalyticsCard";

import AdminListingCard from "../components/AdminListingCard";

import {
    Database,
    ShoppingCart,
    Users,
    Wheat,
    ClipboardList,
    CheckCircle,
    Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [analytics, setAnalytics] =
        useState(null);

    const [listings, setListings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    useEffect(() => {
        const token =
            localStorage.getItem(
                "adminToken"
            );

        if (!token) {
            navigate("/admin/login");
            return;
        }

        fetchAdminData();
    }, []);

    const fetchAdminData =
        async () => {
            try {
                setLoading(true);

                const analyticsRes =
                    await getAdminAnalytics();

                const listingsRes =
                    await getAdminListings();

                if (
                    analyticsRes.data.success
                ) {
                    setAnalytics(
                        analyticsRes.data
                            .analytics
                    );
                }

                if (
                    listingsRes.data.success
                ) {
                    setListings(
                        listingsRes.data
                            .listings
                    );
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    const handleStatusUpdate =
        async (id, status) => {
            try {
                setActionLoading(true);

                await updateListingStatus(
                    id,
                    status
                );

                setListings((prev) =>
                    prev.filter(
                        (item) =>
                            item.id !== id
                    )
                );
            } catch (err) {
                console.error(err);
            } finally {
                setActionLoading(false);
            }
        };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#020617",
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "1.3rem",
                }}
            >
                Loading Admin Dashboard...
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                background:
                    "linear-gradient(to bottom right,#020617,#071428,#020617)",
                minHeight: "100vh",
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
                        marginBottom: "40px",
                    }}
                >
                    <h1
                        className="gradient-text"
                        style={{
                            fontSize: "3rem",
                            fontWeight: 900,
                            marginBottom: "12px",
                        }}
                    >
                        Governance Dashboard
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "1.05rem",
                        }}
                    >
                        AI-powered biomass
                        marketplace moderation &
                        analytics.
                    </p>
                </div>

                {/* ANALYTICS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "24px",
                        marginBottom: "50px",
                    }}
                >
                    <AnalyticsCard
                        title="Total Listings"
                        value={
                            analytics?.total_listings ||
                            0
                        }
                        icon={
                            <Database
                                color="#22c55e"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Approved Listings"
                        value={
                            analytics?.approved_listings ||
                            0
                        }
                        icon={
                            <CheckCircle
                                color="#22c55e"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Pending Listings"
                        value={
                            analytics?.pending_listings ||
                            0
                        }
                        icon={
                            <Clock3
                                color="#f59e0b"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Sold Listings"
                        value={
                            analytics?.sold_listings ||
                            0
                        }
                        icon={
                            <ShoppingCart
                                color="#06b6d4"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Total Buyers"
                        value={
                            analytics?.total_buyers ||
                            0
                        }
                        icon={
                            <Users
                                color="#84cc16"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Total Farmers"
                        value={
                            analytics?.total_farmers ||
                            0
                        }
                        icon={
                            <Wheat
                                color="#84cc16"
                            />
                        }
                    />

                    <AnalyticsCard
                        title="Purchase Requests"
                        value={
                            analytics?.total_purchase_requests ||
                            0
                        }
                        icon={
                            <ClipboardList
                                color="#a855f7"
                            />
                        }
                    />
                </div>

                {/* LISTINGS */}
                <div>
                    <h2
                        style={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            marginBottom: "30px",
                        }}
                    >
                        Pending & Flagged
                        Listings
                    </h2>

                    {listings.length ===
                        0 ? (
                        <div
                            className="glass"
                            style={{
                                padding: "50px",
                                borderRadius:
                                    "30px",
                                textAlign: "center",
                                color: "#94a3b8",
                            }}
                        >
                            No listings awaiting
                            moderation.
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(350px,1fr))",
                                gap: "28px",
                            }}
                        >
                            {listings.map(
                                (listing) => (
                                    <AdminListingCard
                                        key={
                                            listing.id
                                        }
                                        listing={
                                            listing
                                        }
                                        loading={
                                            actionLoading
                                        }
                                        onStatusUpdate={
                                            handleStatusUpdate
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;