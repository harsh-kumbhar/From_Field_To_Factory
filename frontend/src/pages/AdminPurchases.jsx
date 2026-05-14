import { useEffect, useState } from "react";

import {
    getAdminPurchases,
} from "../services/api";

import AdminSidebar from "../components/AdminSidebar";

const AdminPurchases = () => {
    const [purchases, setPurchases] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getAdminPurchases();

                if (
                    response.data.success
                ) {
                    setPurchases(
                        response.data
                            .purchases
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
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
                <h1
                    className="gradient-text"
                    style={{
                        fontSize: "3rem",
                        fontWeight: 900,
                        marginBottom: "12px",
                    }}
                >
                    Purchase Governance
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        marginBottom: "40px",
                    }}
                >
                    Monitor biomass procurement
                    requests and buyer activity.
                </p>

                {loading ? (
                    <div
                        style={{
                            color: "white",
                        }}
                    >
                        Loading purchases...
                    </div>
                ) : purchases.length ===
                    0 ? (
                    <div
                        className="glass"
                        style={{
                            padding: "40px",
                            borderRadius:
                                "24px",
                            color: "#94a3b8",
                        }}
                    >
                        No purchase requests found.
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gap: "20px",
                        }}
                    >
                                {purchases.map((item) => (
                                    <div
                                        key={item.purchase?.id}
                                        className="glass"
                                        style={{
                                            padding: "24px",
                                            borderRadius: "24px",
                                            border:
                                                "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <h2
                                            style={{
                                                color: "white",
                                                marginBottom: "18px",
                                                fontSize: "1.5rem",
                                                fontWeight: 800,
                                            }}
                                        >
                                            {item.buyer?.company_name ||
                                                "Unknown Buyer"}
                                        </h2>

                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "repeat(auto-fit,minmax(220px,1fr))",
                                                gap: "18px",
                                                color: "#cbd5e1",
                                            }}
                                        >
                                            <Info
                                                label="Farmer"
                                                value={
                                                    item.farmer?.name ||
                                                    item.farmer?.full_name ||
                                                    "--"
                                                }
                                            />

                                            <Info
                                                label="Crop"
                                                value={
                                                    item.listing?.crop_type ||
                                                    "--"
                                                }
                                            />

                                            <Info
                                                label="Quantity"
                                                value={`${item.listing?.residue_quantity || 0} Tons`}
                                            />

                                            <Info
                                                label="Amount"
                                                value={`₹${item.purchase?.total_amount || 0}`}
                                            />

                                            <Info
                                                label="Status"
                                                value={
                                                    item.purchase
                                                        ?.deal_status ||
                                                    "--"
                                                }
                                            />

                                            <Info
                                                label="Request Date"
                                                value={
                                                    item.purchase
                                                        ?.created_at
                                                        ? new Date(
                                                            item.purchase.created_at
                                                        ).toLocaleDateString()
                                                        : "--"
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Info = ({
    label,
    value,
}) => {
    return (
        <div>
            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "6px",
                }}
            >
                {label}
            </p>

            <h3
                style={{
                    color: "white",
                }}
            >
                {value || "--"}
            </h3>
        </div>
    );
};

export default AdminPurchases;