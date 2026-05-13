import { motion } from "framer-motion";

import {
  LayoutDashboard,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 20px",
    borderRadius: "18px",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    transition: "0.3s",
    marginBottom: "12px",
    background: "rgba(255,255,255,0.03)",
  };

  return (
    <div
      className="glass glow-green"
      style={{
        width: "280px",
        minHeight: "100vh",
        padding: "30px 22px",
        position: "sticky",
        top: 0,
        borderRadius: "0 32px 32px 0",
      }}
    >
      <div
        style={{
          marginBottom: "50px",
        }}
      >
        <h1
          className="gradient-text"
          style={{
            fontSize: "2rem",
            fontWeight: 900,
          }}
        >
          F2F Admin
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "10px",
          }}
        >
          Biomass Governance Panel
        </p>
      </div>

      {/* LINKS */}
      <div>
        <Link
          to="/admin/dashboard"
          style={itemStyle}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleLogout}
          style={{
            ...itemStyle,
            width: "100%",
            border: "none",
            cursor: "pointer",
            background:
              "rgba(239,68,68,0.15)",
          }}
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>

      {/* SECURITY */}
      <div
        style={{
          marginTop: "60px",
          padding: "20px",
          borderRadius: "22px",
          background:
            "rgba(34,197,94,0.08)",
          border:
            "1px solid rgba(34,197,94,0.15)",
        }}
      >
        <ShieldCheck
          size={32}
          color="#84cc16"
          style={{
            marginBottom: "14px",
          }}
        />

        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          Secure Admin Access
        </h3>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          Protected moderation system
          for biomass marketplace
          governance.
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;