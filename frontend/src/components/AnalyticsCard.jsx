import { motion } from "framer-motion";

const AnalyticsCard = ({
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
                borderRadius: "28px",
                padding: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        color: "#94a3b8",
                        fontWeight: 600,
                    }}
                >
                    {title}
                </div>

                <div>{icon}</div>
            </div>

            <h2
                className="gradient-text"
                style={{
                    fontSize: "3rem",
                    fontWeight: 900,
                }}
            >
                {value}
            </h2>
        </motion.div>
    );
};

export default AnalyticsCard;