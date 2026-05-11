import { useEffect, useState } from "react";
import {
    createPurchaseRequest,
} from "../services/api";
import {
    useParams,
    Link,
} from "react-router-dom";

import { motion } from "framer-motion";
import {
    GoogleMap,
    Polygon,
    useJsApiLoader,
} from "@react-google-maps/api";

import {
    MapPin,
    Calendar,
    Leaf,
    ShieldCheck,
    Map,
    ArrowLeft,
    Tractor,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getListingDetails,
} from "../services/api";

import { useTranslation } from "react-i18next";

const ListingDetailsPage = () => {
    const { t } = useTranslation();

    const { id } = useParams();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [listing, setListing] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");
    const [showModal, setShowModal] =
        useState(false);

    const [buyerMessage, setBuyerMessage] =
        useState("");

    const [requestLoading, setRequestLoading] =
        useState(false);

    const [requestMessage, setRequestMessage] =
        useState("");
    useEffect(() => {
        fetchListing();
    }, [id]);

    const fetchListing = async () => {
        try {
            setLoading(true);

            const response =
                await getListingDetails(id);

            console.log(response.data);

            setListing(response.data.listing);
        } catch (err) {
            console.error(err);

            setError(
                t("listingDetails.error")
            );
        }

        setLoading(false);
    };
    const handlePurchaseRequest =
        async () => {
            try {
                setRequestLoading(true);

                const response =
                    await createPurchaseRequest({
                        listing_id: listing.id,

                        buyer_message:
                            buyerMessage,
                    });

                setRequestMessage(
                    response.data.message
                );

                setShowModal(false);

                fetchListing();
            } catch (err) {
                console.error(err);

                setRequestMessage(
                    err.response?.data
                        ?.message ||
                    "Failed to send request"
                );
            }

            setRequestLoading(false);
        };
    // LOADING
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#020617",
                    color: "white",
                }}
            >
                <Navbar />

                <div
                    className="main-container"
                    style={{
                        paddingTop: "180px",
                        textAlign: "center",
                    }}
                >
                    <div
                        className="glass glow-green"
                        style={{
                            padding: "60px",
                            borderRadius: "30px",
                        }}
                    >
                        <h2
                            className="gradient-text"
                            style={{
                                fontSize: "2rem",
                            }}
                        >
                            {t(
                                "listingDetails.loading"
                            )}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    // ERROR
    if (error || !listing) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#020617",
                    color: "white",
                }}
            >
                <Navbar />

                <div
                    className="main-container"
                    style={{
                        paddingTop: "180px",
                        textAlign: "center",
                    }}
                >
                    <div
                        className="glass"
                        style={{
                            padding: "60px",
                            borderRadius: "30px",
                        }}
                    >
                        <h2
                            style={{
                                color: "#ff6b6b",
                                marginBottom: "20px",
                            }}
                        >
                            {t("listingDetails.notFound")}
                        </h2>

                        <Link to="/marketplace">
                            <button style={buttonStyle}>
                                {t(
                                    "listingDetails.backMarketplace"
                                )}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const imageUrl = listing.image_path
        ? `${import.meta.env.VITE_STORAGE_BUCKET_URL}${listing.image_path}`
        : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";

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
                {/* BACK BUTTON */}
                <Link to="/marketplace">
                    <button
                        style={{
                            ...buttonStyle,
                            marginBottom: "40px",
                        }}
                    >
                        <ArrowLeft size={18} />
                        {t(
                            "listingDetails.backMarketplace"
                        )}
                    </button>
                </Link>

                {/* HERO IMAGE */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="glass glow-green"
                    style={{
                        borderRadius: "36px",
                        overflow: "hidden",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={listing.crop_type}
                            onError={(e) => {
                                e.target.src =
                                    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop";
                            }}
                            style={{
                                width: "100%",
                                height: "500px",
                                objectFit: "cover",
                            }}
                        />

                        {/* OVERLAY */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(2,6,23,0.95), rgba(2,6,23,0.1))",
                            }}
                        />

                        {/* VERIFIED BADGE */}
                        <div
                            style={{
                                position: "absolute",
                                top: "30px",
                                left: "30px",
                                background:
                                    "linear-gradient(to right,#22c55e,#84cc16)",
                                color: "#020617",
                                padding: "12px 20px",
                                borderRadius: "999px",
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <ShieldCheck size={18} />

                            {t(
                                "listingDetails.verified"
                            )}
                        </div>

                        {/* TITLE */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "40px",
                                left: "40px",
                            }}
                        >
                            <p
                                style={{
                                    color: "#84cc16",
                                    marginBottom: "12px",
                                    fontWeight: 700,
                                }}
                            >
                                {t(
                                    "listingDetails.pricingInsights"
                                )}
                            </p>

                            <h1
                                className="gradient-text"
                                style={{
                                    fontSize:
                                        "clamp(3rem,6vw,5rem)",
                                    fontWeight: 900,
                                    marginBottom: "16px",
                                }}
                            >
                                {listing.crop_type}
                            </h1>

                            <p
                                style={{
                                    color: "#cbd5e1",
                                    fontSize: "1.1rem",
                                }}
                            >
                                AI-powered verified biomass
                                marketplace listing
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* PRICING GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(250px,1fr))",
                        gap: "24px",
                        marginBottom: "40px",
                    }}
                >
                    <PricingCard
                        title={t(
                            "listingDetails.quantity"
                        )}
                        value={`${listing.residue_quantity} Tons`}
                        icon={<Leaf />}
                    />

                    <PricingCard
                        title={t(
                            "listingDetails.pricePerTonne"
                        )}
                        value={`₹${listing.predicted_price_per_tonne}`}
                        icon={<Tractor />}
                    />

                    <PricingCard
                        title={t(
                            "listingDetails.priceRange"
                        )}
                        value={`₹${listing.price_min} - ₹${listing.price_max}`}
                        icon={<ShieldCheck />}
                    />

                    <PricingCard
                        title={t(
                            "listingDetails.pickupDate"
                        )}
                        value={listing.pickup_date}
                        icon={<Calendar />}
                    />
                </div>

                {/* TOTAL VALUE */}
                <div
                    className="glass glow-green"
                    style={{
                        padding: "50px",
                        borderRadius: "36px",
                        marginBottom: "40px",
                    }}
                >
                    <p
                        style={{
                            color: "#94a3b8",
                            marginBottom: "16px",
                            fontWeight: 600,
                        }}
                    >
                        {t(
                            "listingDetails.marketValue"
                        )}
                    </p>

                    <h2
                        className="gradient-text"
                        style={{
                            fontSize:
                                "clamp(3rem,6vw,5rem)",
                            fontWeight: 900,
                        }}
                    >
                        ₹
                        {listing.total_listing_price}
                    </h2>
                </div>
                {/* PURCHASE SECTION */}
                <div
                    className="glass glow-green"
                    style={{
                        padding: "40px",
                        borderRadius: "32px",
                        marginBottom: "40px",
                        textAlign: "center",
                    }}
                >
                    {listing.status === "sold" ? (
                        <>
                            <h2
                                style={{
                                    color: "#ef4444",
                                    fontSize: "2.5rem",
                                    fontWeight: 900,
                                    marginBottom: "16px",
                                }}
                            >
                                {t("purchase.soldOut")}
                            </h2>

                            <p
                                style={{
                                    color: "#94a3b8",
                                }}
                            >
                                This biomass listing has already
                                been sold.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "20px",
                                }}
                            >
                                Ready To Procure This Biomass?
                            </h2>

                            <button
                                onClick={() =>
                                    setShowModal(true)
                                }
                                style={{
                                    background:
                                        "linear-gradient(to right,#22c55e,#84cc16)",
                                    color: "#020617",
                                    border: "none",
                                    padding: "18px 34px",
                                    borderRadius: "18px",
                                    fontWeight: 900,
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                }}
                            >
                                {t(
                                    "purchase.sendRequest"
                                )}
                            </button>
                        </>
                    )}

                    {requestMessage && (
                        <p
                            style={{
                                marginTop: "20px",
                                color: "#84cc16",
                            }}
                        >
                            {requestMessage}
                        </p>
                    )}
                </div>

                {/* REGION + FIELD */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(320px,1fr))",
                        gap: "30px",
                        marginBottom: "40px",
                    }}
                >
                    {/* REGION */}
                    <div
                        className="glass"
                        style={{
                            padding: "36px",
                            borderRadius: "30px",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "2rem",
                                marginBottom: "30px",
                            }}
                        >
                            {t(
                                "listingDetails.regionInfo"
                            )}
                        </h2>

                        <InfoRow
                            label={t(
                                "listingDetails.state"
                            )}
                            value={listing.state}
                        />

                        <InfoRow
                            label={t(
                                "listingDetails.district"
                            )}
                            value={listing.district}
                        />

                        <InfoRow
                            label={t(
                                "listingDetails.village"
                            )}
                            value={listing.village}
                        />
                    </div>

                    {/* FIELD INFO */}
                    <div
                        className="glass"
                        style={{
                            padding: "36px",
                            borderRadius: "30px",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "2rem",
                                marginBottom: "30px",
                            }}
                        >
                            {t(
                                "listingDetails.fieldInfo"
                            )}
                        </h2>

                        <InfoRow
                            label={t(
                                "listingDetails.cropType"
                            )}
                            value={listing.crop_type}
                        />

                        <InfoRow
                            label={t(
                                "listingDetails.area"
                            )}
                            value={`${listing.field?.area_acres || 0} Acres`}
                        />

                        <InfoRow
                            label={t(
                                "listingDetails.polygon"
                            )}
                            value={t(
                                "listingDetails.polygonAvailable"
                            )}
                        />
                    </div>
                </div>
                {/* GOOGLE MAP SECTION */}
                <div
                    className="glass glow-green"
                    style={{
                        borderRadius: "36px",
                        overflow: "hidden",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            padding: "30px",
                            borderBottom:
                                "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <Map color="#84cc16" />

                        <h2
                            style={{
                                fontSize: "1.8rem",
                            }}
                        >
                            {t("listingDetails.mapPreview")}
                        </h2>
                    </div>

                    {/* MAP CONTENT */}
                    <div
                        style={{
                            height: "420px",
                            width: "100%",
                        }}
                    >
                        {!listing.field?.polygon_available ? (
                            <div
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    background:
                                        "linear-gradient(135deg,#0f172a,#111827)",
                                    color: "#94a3b8",
                                }}
                            >
                                <Map
                                    size={50}
                                    color="#22c55e"
                                />

                                <h3
                                    style={{
                                        marginTop: "20px",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    No Polygon Data Available
                                </h3>
                            </div>
                        ) : isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={
                                    mapContainerStyle
                                }
                                center={
                                    listing.field.map_center
                                }
                                zoom={15}
                                options={{
                                    styles: darkMapStyle,

                                    disableDefaultUI: true,

                                    zoomControl: true,

                                    draggable: false,

                                    scrollwheel: false,

                                    disableDoubleClickZoom: true,
                                }}
                            >
                                <Polygon
                                    paths={
                                        listing.field.coordinates
                                    }
                                    options={{
                                        fillColor: "#22c55e",

                                        fillOpacity: 0.35,

                                        strokeColor: "#84cc16",

                                        strokeOpacity: 1,

                                        strokeWeight: 3,
                                    }}
                                />
                            </GoogleMap>
                        ) : (
                            <div
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background:
                                        "linear-gradient(135deg,#0f172a,#111827)",
                                }}
                            >
                                <h3
                                    className="gradient-text"
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    Loading Map...
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
                {/* NOTES */}
                <div
                    className="glass"
                    style={{
                        padding: "40px",
                        borderRadius: "36px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2rem",
                            marginBottom: "24px",
                        }}
                    >
                        {t("listingDetails.notes")}
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                            lineHeight: 1.9,
                            fontSize: "1.05rem",
                        }}
                    >
                        {t(
                            "listingDetails.notesText"
                        )}
                    </p>
                </div>
            </div>
            {/* PURCHASE MODAL */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background:
                            "rgba(0,0,0,0.75)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                        padding: "20px",
                    }}
                >
                    <div
                        className="glass glow-green"
                        style={{
                            width: "100%",
                            maxWidth: "520px",
                            padding: "40px",
                            borderRadius: "32px",
                        }}
                    >
                        <h2
                            className="gradient-text"
                            style={{
                                fontSize: "2rem",
                                marginBottom: "28px",
                            }}
                        >
                            {t(
                                "purchase.sendRequest"
                            )}
                        </h2>

                        <textarea
                            value={buyerMessage}
                            onChange={(e) =>
                                setBuyerMessage(
                                    e.target.value
                                )
                            }
                            placeholder={t(
                                "purchase.buyerPlaceholder"
                            )}
                            style={{
                                width: "100%",
                                minHeight: "140px",
                                background:
                                    "rgba(255,255,255,0.05)",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "18px",
                                padding: "18px",
                                color: "white",
                                outline: "none",
                                resize: "none",
                                marginBottom: "24px",
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                gap: "16px",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                style={{
                                    flex: 1,
                                    background:
                                        "rgba(255,255,255,0.08)",
                                    border: "none",
                                    padding: "16px",
                                    borderRadius: "16px",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                disabled={requestLoading}
                                onClick={
                                    handlePurchaseRequest
                                }
                                style={{
                                    flex: 1,
                                    background:
                                        "linear-gradient(to right,#22c55e,#84cc16)",
                                    border: "none",
                                    padding: "16px",
                                    borderRadius: "16px",
                                    color: "#020617",
                                    fontWeight: 800,
                                    cursor: "pointer",
                                }}
                            >
                                {requestLoading
                                    ? t("purchase.sending")
                                    : t(
                                        "purchase.submitRequest"
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

// PRICING CARD
const PricingCard = ({
    title,
    value,
    icon,
}) => {
    return (
        <motion.div
            whileHover={{
                y: -6,
            }}
            className="glass glow-green"
            style={{
                padding: "30px",
                borderRadius: "28px",
            }}
        >
            <div
                style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background:
                        "linear-gradient(to right,#22c55e,#84cc16)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "22px",
                    color: "#020617",
                }}
            >
                {icon}
            </div>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "14px",
                }}
            >
                {title}
            </p>

            <h2
                style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                }}
            >
                {value}
            </h2>
        </motion.div>
    );
};

// INFO ROW
const InfoRow = ({
    label,
    value,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "18px",
                marginBottom: "18px",
                borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <span
                style={{
                    color: "#94a3b8",
                }}
            >
                {label}
            </span>

            <span
                style={{
                    fontWeight: 700,
                }}
            >
                {value}
            </span>
        </div>
    );
};
const mapContainerStyle = {
    width: "100%",
    height: "420px",
};

const darkMapStyle = [
    {
        elementType: "geometry",
        stylers: [{ color: "#0f172a" }],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#0f172a" }],
    },
    {
        elementType: "labels.text.fill",
        stylers: [{ color: "#94a3b8" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#1e293b" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#020617" }],
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
];
const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background:
        "linear-gradient(to right,#22c55e,#84cc16)",
    color: "#020617",
    border: "none",
    padding: "14px 24px",
    borderRadius: "16px",
    fontWeight: 800,
    cursor: "pointer",
};

export default ListingDetailsPage;