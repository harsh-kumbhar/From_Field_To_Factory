import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndustryDashboard from "./pages/IndustryDashboard";
import MarketplacePage from "./pages/MarketplacePage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import MyRequestsPage from "./pages/MyRequestsPage";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <IndustryDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/marketplace" element={<MarketplacePage />} />

                <Route
                    path="/listing/:id"
                    element={<ListingDetailsPage />}
                />
                <Route
                    path="/my-requests"
                    element={<MyRequestsPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;