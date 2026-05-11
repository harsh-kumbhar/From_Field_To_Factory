import { useTranslation } from "react-i18next";

const FilterBar = ({
    search,
    setSearch,
    crop,
    setCrop,
    minQty,
    setMinQty,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className="glass glow-green"
            style={{
                borderRadius: "30px",
                padding: "28px",
                display: "grid",
                gridTemplateColumns:
                    "1.4fr 1fr 1fr auto",
                gap: "18px",
                marginBottom: "50px",
                alignItems: "center",
            }}
        >
            {/* SEARCH */}
            <input
                type="text"
                placeholder={t("marketplacePage.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={inputStyle}
            />

            {/* CROP FILTER */}
            <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                style={inputStyle}
            >
                <option
                    value=""
                    style={{
                        background: "#0f172a",
                        color: "white",
                    }}
                >
                    {t("marketplacePage.allCrops")}
                </option>

                <option
                    value="Wheat"
                    style={{
                        background: "#0f172a",
                        color: "white",
                    }}
                >
                    Wheat
                </option>

                <option
                    value="Rice"
                    style={{
                        background: "#0f172a",
                        color: "white",
                    }}
                >
                    Rice
                </option>

                <option
                    value="Sugarcane"
                    style={{
                        background: "#0f172a",
                        color: "white",
                    }}
                >
                    Sugarcane
                </option>
            </select>

            {/* MIN QTY */}
            <input
                type="number"
                placeholder={t(
                    "marketplacePage.minimumQuantity"
                )}
                value={minQty}
                onChange={(e) => setMinQty(e.target.value)}
                style={inputStyle}
            />

            {/* APPLY BUTTON */}
            <button
                style={{
                    background:
                        "linear-gradient(to right,#22c55e,#84cc16)",
                    color: "#020617",
                    border: "none",
                    padding: "18px 28px",
                    borderRadius: "18px",
                    fontWeight: 900,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                }}
            >
                {t("marketplacePage.applyFilters")}
            </button>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    outline: "none",
    fontSize: "1rem",
};

export default FilterBar;