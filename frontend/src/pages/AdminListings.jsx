import { useEffect, useState } from "react";

import {
    getAdminListings,
} from "../services/api";

import AdminSidebar from "../components/AdminSidebar";
import AdminListingCard from "../components/AdminListingCard";

import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ShoppingCart,
} from "lucide-react";

const AdminListings = () => {
    const [listings, setListings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getAdminListings();

                if (
                    response.data.success
                ) {
                    setListings(
                        response.data
                            .listings
                    );
                }
            } catch (error) {
                console.log(
                    "ADMIN LISTINGS ERROR:",
                    error.response?.data
                );
            } finally {
                setLoading(false);
            }
        };

    const groupedListings = {
        pending:
            listings.filter(
                (item) =>
                    item.status ===
                    "pending"
            ),

        approved:
            listings.filter(
                (item) =>
                    item.status ===
                    "approved"
            ),

        flagged:
            listings.filter(
                (item) =>
                    item.status ===
                    "flagged"
            ),

        rejected:
            listings.filter(
                (item) =>
                    item.status ===
                    "rejected"
            ),

        sold:
            listings.filter(
                (item) =>
                    item.status ===
                    "sold"
            ),
    };

    const renderSection = (
        title,
        items,
        icon,
        color
    ) => (
        <div
            style={{
                marginBottom: "60px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems:
                        "center",
                    gap: "14px",
                    marginBottom:
                        "28px",
                }}
            >
                {icon}

                <h2
                    style={{
                        fontSize:
                            "2rem",
                        fontWeight: 900,
                        color:
                            "white",
                    }}
                >
                    {title}
                </h2>

                <div
                    style={{
                        background:
                            color,
                        padding:
                            "6px 14px",
                        borderRadius:
                            "999px",
                        fontWeight: 800,
                    }}
                >
                    {items.length}
                </div>
            </div>

            {items.length === 0 ? (
                <div
                    className="glass"
                    style={{
                        padding:
                            "40px",
                        borderRadius:
                            "26px",
                        color:
                            "#94a3b8",
                    }}
                >
                    No listings found.
                </div>
            ) : (
                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(380px,1fr))",

                        gap: "28px",
                    }}
                >
                    {items.map(
                        (
                            listing
                        ) => (
                            <AdminListingCard
                                key={
                                    listing.id
                                }
                                listing={
                                    listing
                                }
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div
                style={{
                    minHeight:
                        "100vh",

                    background:
                        "#020617",

                    display: "flex",

                    justifyContent:
                        "center",

                    alignItems:
                        "center",

                    color: "white",

                    fontSize:
                        "1.2rem",
                }}
            >
                Loading Moderation Center...
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",

                minHeight:
                    "100vh",

                background:
                    "linear-gradient(to bottom right,#020617,#071428,#020617)",
            }}
        >
            <AdminSidebar />

            <div
                style={{
                    flex: 1,
                    padding: "40px",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        marginBottom:
                            "50px",
                    }}
                >
                    <h1
                        className="gradient-text"
                        style={{
                            fontSize:
                                "3rem",
                            fontWeight: 900,
                            marginBottom:
                                "12px",
                        }}
                    >
                        Marketplace
                        Moderation Center
                    </h1>

                    <p
                        style={{
                            color:
                                "#94a3b8",

                            fontSize:
                                "1.05rem",
                        }}
                    >
                        AI-powered biomass
                        listing governance &
                        satellite verification
                        operations.
                    </p>
                </div>

                {renderSection(
                    "Pending Verification",
                    groupedListings.pending,
                    <ShieldCheck color="#f59e0b" />,
                    "rgba(245,158,11,0.2)"
                )}

                {renderSection(
                    "Approved Listings",
                    groupedListings.approved,
                    <CheckCircle color="#22c55e" />,
                    "rgba(34,197,94,0.2)"
                )}

                {renderSection(
                    "Flagged Listings",
                    groupedListings.flagged,
                    <AlertTriangle color="#a855f7" />,
                    "rgba(168,85,247,0.2)"
                )}

                {renderSection(
                    "Rejected Listings",
                    groupedListings.rejected,
                    <XCircle color="#ef4444" />,
                    "rgba(239,68,68,0.2)"
                )}

                {renderSection(
                    "Sold Listings",
                    groupedListings.sold,
                    <ShoppingCart color="#06b6d4" />,
                    "rgba(6,182,212,0.2)"
                )}
            </div>
        </div>
    );
};

export default AdminListings;