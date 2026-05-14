import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndustryDashboard from "./pages/IndustryDashboard";
import MarketplacePage from "./pages/MarketplacePage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import MyRequestsPage from "./pages/MyRequestsPage";
import AdminPurchases from "./pages/AdminPurchases";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminListings from "./pages/AdminListings";
import AdminVerification from "./pages/AdminVerification";

const ProtectedRoute = ({
    children,
}) => {
    const token =
        localStorage.getItem(
            "token"
        );

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
};

const AdminProtectedRoute = ({
    children,
}) => {
    const adminToken =
        localStorage.getItem(
            "adminToken"
        );

    if (!adminToken) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC */}
                <Route
                    path="/"
                    element={
                        <LandingPage />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <LoginPage />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <RegisterPage />
                    }
                />

                <Route
                    path="/marketplace"
                    element={
                        <MarketplacePage />
                    }
                />

                <Route
                    path="/listing/:id"
                    element={
                        <ListingDetailsPage />
                    }
                />

                {/* USER PROTECTED */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <IndustryDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-requests"
                    element={
                        <ProtectedRoute>
                            <MyRequestsPage />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN */}
                <Route
                    path="/admin/login"
                    element={
                        <AdminLoginPage />
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminProtectedRoute>
                            <AdminDashboard />
                        </AdminProtectedRoute>
                    }
                />

                <Route
                    path="/admin/listings"
                    element={
                        <AdminProtectedRoute>
                            <AdminListings />
                        </AdminProtectedRoute>
                    }
                />

                <Route
                    path="/admin/verification/:listingId"
                    element={
                        <AdminProtectedRoute>
                            <AdminVerification />
                        </AdminProtectedRoute>
                    }
                />
                <Route
                    path="/admin/purchases"
                    element={
                        <AdminProtectedRoute>
                            <AdminPurchases />
                        </AdminProtectedRoute>
                    }
                />

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;