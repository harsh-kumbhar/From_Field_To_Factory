import { motion } from "framer-motion";

import {
    ShieldCheck,
    ShieldAlert,
    Satellite,
} from "lucide-react";

const VerificationBadge = ({
    verified = false,
    compact = false,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.8,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.25,
            }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: compact
                    ? "8px"
                    : "12px",
                padding: compact
                    ? "10px 14px"
                    : "12px 18px",
                borderRadius: "999px",

                background: verified
                    ? "linear-gradient(to right, rgba(34,197,94,0.22), rgba(132,204,22,0.18))"
                    : "linear-gradient(to right, rgba(239,68,68,0.2), rgba(249,115,22,0.16))",

                border: verified
                    ? "1px solid rgba(34,197,94,0.35)"
                    : "1px solid rgba(239,68,68,0.35)",

                backdropFilter:
                    "blur(12px)",

                boxShadow: verified
                    ? "0 0 24px rgba(34,197,94,0.18)"
                    : "0 0 24px rgba(239,68,68,0.14)",

                color: verified
                    ? "#22c55e"
                    : "#ef4444",

                fontWeight: 800,
                fontSize: compact
                    ? "0.82rem"
                    : "0.92rem",

                letterSpacing:
                    "0.3px",
            }}
        >
            {/* ICON */}
            <div
                style={{
                    width: compact
                        ? "28px"
                        : "34px",

                    height: compact
                        ? "28px"
                        : "34px",

                    borderRadius:
                        "999px",

                    background: verified
                        ? "rgba(34,197,94,0.18)"
                        : "rgba(239,68,68,0.18)",

                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                }}
            >
                {verified ? (
                    <ShieldCheck
                        size={
                            compact
                                ? 16
                                : 18
                        }
                    />
                ) : (
                    <ShieldAlert
                        size={
                            compact
                                ? 16
                                : 18
                        }
                    />
                )}
            </div>

            {/* TEXT */}
            <div
                style={{
                    display: "flex",
                    alignItems:
                        "center",
                    gap: "8px",
                }}
            >
                <Satellite
                    size={
                        compact
                            ? 14
                            : 16
                    }
                />

                <span>
                    {verified
                        ? "Satellite Verified"
                        : "Not Verified"}
                </span>
            </div>
        </motion.div>
    );
};

export default VerificationBadge;