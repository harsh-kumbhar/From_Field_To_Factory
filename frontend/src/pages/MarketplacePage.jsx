import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
import ListingCard from "../components/ListingCard";

import { getMarketplaceListings } from "../services/api";

import { useTranslation } from "react-i18next";

const MarketplacePage = () => {
    const { t } = useTranslation();

    const [listings, setListings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [crop, setCrop] = useState("");

    const [minQty, setMinQty] = useState("");

    useEffect(() => {
        fetchListings();
    }, [search, crop, minQty]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await getMarketplaceListings(
                    search,
                    crop,
                    minQty
                );

            console.log(response.data);

            setListings(
                response.data.listings || []
            );
        } catch (err) {
            console.error(err);

            setError(
                "Failed to load marketplace listings"
            );
        }

        setLoading(false);
    };

    return (
        <div
            style={{
                background: "#020617",
                minHeight: "100vh",
            }}
        >
            <Navbar />

            <div
                className="main-container"
                style={{
                    paddingTop: "150px",
                    paddingBottom: "100px",
                }}
            >
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: "50px",
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            color: "#84cc16",
                            marginBottom: "16px",
                            fontWeight: 700,
                        }}
                    >
                        {t("marketplacePage.badge")}
                    </p>

                    <h1
                        className="gradient-text"
                        style={{
                            fontSize: "clamp(3rem,6vw,5rem)",
                            fontWeight: 900,
                            marginBottom: "20px",
                        }}
                    >
                        {t("marketplacePage.title")}
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            maxWidth: "800px",
                            margin: "0 auto",
                            lineHeight: 1.8,
                        }}
                    >
                        {t("marketplacePage.subtitle")}
                    </p>
                </motion.div>

                {/* FILTERS */}
                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    crop={crop}
                    setCrop={setCrop}
                    minQty={minQty}
                    setMinQty={setMinQty}
                />

                {/* LOADING */}
                {loading && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "80px",
                            color: "#94a3b8",
                        }}
                    >
                        {t("marketplacePage.loading")}
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div
                        className="glass"
                        style={{
                            padding: "30px",
                            borderRadius: "24px",
                            color: "#ff6b6b",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    listings.length === 0 && (
                        <div
                            className="glass"
                            style={{
                                padding: "60px",
                                borderRadius: "30px",
                                textAlign: "center",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "14px",
                                }}
                            >
                                {t(
                                    "marketplacePage.noListings"
                                )}
                            </h2>

                            <p
                                style={{
                                    color: "#94a3b8",
                                }}
                            >
                                {t(
                                    "marketplacePage.adjustFilters"
                                )}
                            </p>
                        </div>
                    )}

                {/* GRID */}
                {!loading &&
                    listings.length > 0 && (
                        <div
                            style={{
                                display: "grid",
                                gap: "30px",
                            }}
                        >
                            {listings.map((listing) => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                />
                            ))}
                        </div>
                    )}
            </div>

            <Footer />
        </div>
    );
};

export default MarketplacePage;