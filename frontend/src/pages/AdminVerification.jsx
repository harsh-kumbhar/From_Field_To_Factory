import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

import {
    MapContainer,
    TileLayer,
    Polygon,
    Marker,
    Popup,
    GeoJSON,
    useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
    getVerificationWorkspace,
    updateListingStatus,
    verifyListingSatellite,
} from "../services/api";

import AdminSidebar from "../components/AdminSidebar";

import {
    ShieldCheck,
    Satellite,
    Wheat,
    Calendar,
    IndianRupee,
    MapPin,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ArrowLeft,
} from "lucide-react";

const FitBounds = ({ bounds }) => {
    const map = useMap();

    useEffect(() => {
        if (bounds?.length === 2) {
            map.fitBounds(bounds);
        }
    }, [bounds]);

    return null;
};

const AdminVerification = () => {
    const { listingId } =
        useParams();

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [verificationData,
        setVerificationData] =
        useState(null);

    useEffect(() => {
        fetchVerification();
    }, [listingId]);

    const fetchVerification =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getVerificationWorkspace(
                        listingId
                    );

                if (
                    response.data.success
                ) {
                    setVerificationData(
                        response.data
                    );
                }
            } catch (error) {
                console.log(
                    "VERIFICATION ERROR:",
                    error.response?.data
                );
            } finally {
                setLoading(false);
            }
        };

    const handleStatusUpdate =
        async (status) => {
            try {
                setActionLoading(true);

                await updateListingStatus(
                    listingId,
                    status
                );

                navigate(
                    "/admin/listings"
                );
            } catch (error) {
                console.log(
                    "STATUS UPDATE ERROR:",
                    error.response?.data
                );
            } finally {
                setActionLoading(false);
            }
        };

    const handleSatelliteVerification =
        async () => {
            try {
                setActionLoading(true);

                await verifyListingSatellite(
                    listingId
                );

                await fetchVerification();
            } catch (error) {
                console.log(
                    "VERIFY ERROR:",
                    error.response?.data
                );
            } finally {
                setActionLoading(false);
            }
        };

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
                Loading Verification Workspace...
            </div>
        );
    }

    const listing =
        verificationData?.listing;

    const verification =
        verificationData?.verification;

    const mapData =
        verificationData?.map;

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
                    padding: "30px",
                    overflow: "hidden",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        marginBottom:
                            "30px",
                    }}
                >
                    <div>
                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/listings"
                                )
                            }
                            style={{
                                marginBottom:
                                    "18px",
                                background:
                                    "rgba(255,255,255,0.06)",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                                color:
                                    "white",
                                padding:
                                    "12px 18px",
                                borderRadius:
                                    "14px",
                                cursor:
                                    "pointer",
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                gap: "8px",
                            }}
                        >
                            <ArrowLeft size={18} />
                            Back to Listings
                        </button>

                        <h1
                            className="gradient-text"
                            style={{
                                fontSize:
                                    "3rem",
                                fontWeight: 900,
                                marginBottom:
                                    "10px",
                            }}
                        >
                            AI Verification
                            Workspace
                        </h1>

                        <p
                            style={{
                                color:
                                    "#94a3b8",
                            }}
                        >
                            Satellite intelligence
                            & biomass moderation
                            command center.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "14px",
                        }}
                    >
                        <button
                            disabled={
                                actionLoading
                            }
                            onClick={
                                handleSatelliteVerification
                            }
                            style={{
                                background:
                                    "linear-gradient(to right,#06b6d4,#22c55e)",
                                border:
                                    "none",
                                padding:
                                    "14px 22px",
                                borderRadius:
                                    "16px",
                                color:
                                    "#020617",
                                fontWeight: 900,
                                cursor:
                                    "pointer",
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                gap: "10px",
                            }}
                        >
                            <Satellite size={18} />
                            Run Satellite Verify
                        </button>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1.4fr 0.8fr",
                        gap: "24px",
                    }}
                >
                    {/* MAP SIDE */}
                    <div
                        className="glass"
                        style={{
                            borderRadius:
                                "30px",
                            overflow:
                                "hidden",
                            border:
                                "1px solid rgba(255,255,255,0.08)",
                            minHeight:
                                "780px",
                        }}
                    >
                        <MapContainer
                            center={
                                mapData
                                    ?.center || [
                                    20.5937,
                                    78.9629,
                                ]
                            }
                            zoom={15}
                            style={{
                                width: "100%",
                                height:
                                    "780px",
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {mapData?.bounds && (
                                <FitBounds
                                    bounds={
                                        mapData.bounds
                                    }
                                />
                            )}

                            {mapData?.polygon && (
                                <Polygon
                                    positions={
                                        mapData.polygon
                                    }
                                    pathOptions={{
                                        color:
                                            "#22c55e",
                                        fillColor:
                                            "#22c55e",
                                        fillOpacity:
                                            0.2,
                                    }}
                                />
                            )}

                            {mapData?.geojson && (
                                <GeoJSON
                                    data={
                                        mapData.geojson
                                    }
                                />
                            )}

                            {mapData?.center && (
                                <Marker
                                    position={
                                        mapData.center
                                    }
                                >
                                    <Popup>
                                        Biomass
                                        Field
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                    </div>

                    {/* RIGHT PANEL */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: "24px",
                        }}
                    >
                        {/* LISTING INFO */}
                        <div
                            className="glass"
                            style={{
                                padding:
                                    "28px",
                                borderRadius:
                                    "28px",
                            }}
                        >
                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                    marginBottom:
                                        "24px",
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize:
                                            "1.8rem",
                                        fontWeight: 900,
                                    }}
                                >
                                    {
                                        listing?.crop_type
                                    }{" "}
                                    Biomass
                                </h2>

                                {listing?.satellite_verified && (
                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "8px",
                                            color:
                                                "#22c55e",
                                            fontWeight: 800,
                                        }}
                                    >
                                        <ShieldCheck size={18} />
                                        Verified
                                    </div>
                                )}
                            </div>

                            <InfoRow
                                icon={<Wheat size={18} />}
                                label="Residue Quantity"
                                value={`${listing?.residue_quantity || 0} Tons`}
                            />

                            <InfoRow
                                icon={<IndianRupee size={18} />}
                                label="AI Pricing"
                                value={`₹${listing?.predicted_price_per_tonne || "--"}/Ton`}
                            />

                            <InfoRow
                                icon={<Calendar size={18} />}
                                label="Pickup Date"
                                value={
                                    listing?.pickup_date
                                }
                            />

                            <InfoRow
                                icon={<MapPin size={18} />}
                                label="Region"
                                value={`${listing?.district || "--"}, ${listing?.state || "--"}`}
                            />
                        </div>

                        {/* METRICS */}
                        <div
                            className="glass"
                            style={{
                                padding:
                                    "28px",
                                borderRadius:
                                    "28px",
                            }}
                        >
                            <h2
                                style={{
                                    marginBottom:
                                        "24px",
                                    fontSize:
                                        "1.5rem",
                                    fontWeight: 900,
                                }}
                            >
                                Geospatial
                                Intelligence
                            </h2>

                            <div
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "16px",
                                }}
                            >
                                <MetricCard
                                    label="NDVI"
                                    value={
                                        verification?.ndvi
                                    }
                                    color="#22c55e"
                                />

                                <MetricCard
                                    label="NDTI"
                                    value={
                                        verification?.ndti
                                    }
                                    color="#06b6d4"
                                />

                                <MetricCard
                                    label="BSI"
                                    value={
                                        verification?.bsi
                                    }
                                    color="#f59e0b"
                                />

                                <MetricCard
                                    label="Harvested"
                                    value={
                                        verification?.harvested
                                            ? "YES"
                                            : "NO"
                                    }
                                    color="#84cc16"
                                />
                            </div>
                        </div>

                        {/* SATELLITE IMAGES */}
                        <div
                            className="glass"
                            style={{
                                padding:
                                    "28px",
                                borderRadius:
                                    "28px",
                            }}
                        >
                            <h2
                                style={{
                                    marginBottom:
                                        "20px",
                                    fontSize:
                                        "1.4rem",
                                    fontWeight: 900,
                                }}
                            >
                                Satellite
                                Imagery
                            </h2>

                            <div
                                style={{
                                    display:
                                        "flex",
                                    flexDirection:
                                        "column",
                                    gap: "18px",
                                }}
                            >
                                <img
                                    src={
                                        verification?.satellite_thumbnail
                                    }
                                    alt="Satellite"
                                    style={{
                                        width: "100%",
                                        borderRadius:
                                            "18px",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                    }}
                                />

                                <img
                                    src={
                                        verification?.ndvi_thumbnail
                                    }
                                    alt="NDVI"
                                    style={{
                                        width: "100%",
                                        borderRadius:
                                            "18px",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div
                            className="glass"
                            style={{
                                padding:
                                    "28px",
                                borderRadius:
                                    "28px",
                            }}
                        >
                            <h2
                                style={{
                                    marginBottom:
                                        "22px",
                                    fontSize:
                                        "1.5rem",
                                    fontWeight: 900,
                                }}
                            >
                                Moderation
                                Actions
                            </h2>

                            <div
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "1fr",
                                    gap: "14px",
                                }}
                            >
                                <button
                                    disabled={
                                        actionLoading
                                    }
                                    onClick={() =>
                                        handleStatusUpdate(
                                            "approved"
                                        )
                                    }
                                    style={
                                        approveBtn
                                    }
                                >
                                    <CheckCircle size={18} />
                                    Approve Listing
                                </button>

                                <button
                                    disabled={
                                        actionLoading
                                    }
                                    onClick={() =>
                                        handleStatusUpdate(
                                            "flagged"
                                        )
                                    }
                                    style={
                                        flagBtn
                                    }
                                >
                                    <AlertTriangle size={18} />
                                    Flag Listing
                                </button>

                                <button
                                    disabled={
                                        actionLoading
                                    }
                                    onClick={() =>
                                        handleStatusUpdate(
                                            "rejected"
                                        )
                                    }
                                    style={
                                        rejectBtn
                                    }
                                >
                                    <XCircle size={18} />
                                    Reject Listing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({
    icon,
    label,
    value,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
                marginBottom: "18px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#94a3b8",
                }}
            >
                {icon}
                {label}
            </div>

            <div
                style={{
                    fontWeight: 800,
                    color: "white",
                }}
            >
                {value}
            </div>
        </div>
    );
};

const MetricCard = ({
    label,
    value,
    color,
}) => {
    return (
        <div
            style={{
                background:
                    "rgba(255,255,255,0.04)",
                border:
                    "1px solid rgba(255,255,255,0.06)",
                borderRadius:
                    "18px",
                padding: "18px",
                textAlign: "center",
            }}
        >
            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "10px",
                }}
            >
                {label}
            </p>

            <h2
                style={{
                    color,
                    fontWeight: 900,
                    fontSize: "1.3rem",
                }}
            >
                {typeof value ===
                    "number"
                    ? value.toFixed(2)
                    : value || "--"}
            </h2>
        </div>
    );
};

const approveBtn = {
    background:
        "linear-gradient(to right,#22c55e,#84cc16)",
    border: "none",
    padding: "16px",
    borderRadius: "16px",
    color: "#020617",
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
};

const rejectBtn = {
    background:
        "rgba(239,68,68,0.18)",
    border:
        "1px solid rgba(239,68,68,0.3)",
    padding: "16px",
    borderRadius: "16px",
    color: "#ef4444",
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
};

const flagBtn = {
    background:
        "rgba(139,92,246,0.18)",
    border:
        "1px solid rgba(139,92,246,0.3)",
    padding: "16px",
    borderRadius: "16px",
    color: "#a78bfa",
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
};

export default AdminVerification;