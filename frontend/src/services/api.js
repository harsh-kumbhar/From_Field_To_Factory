import axios from "axios";

const API = axios.create({
    baseURL:
        "http://127.0.0.1:5000/api",
});

/* =========================================
   TOKEN HELPERS
========================================= */

const getUserToken = () =>
    localStorage.getItem("token");

const getAdminToken = () =>
    localStorage.getItem(
        "adminToken"
    );

const userHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getUserToken()}`,
    },
});

const adminHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAdminToken()}`,
    },
});

/* =========================================
   BUYER AUTH
========================================= */

export const loginBuyer = async (
    data
) => {
    return API.post(
        "/auth/login",
        data
    );
};

export const registerBuyer =
    async (data) => {
        return API.post(
            "/auth/register",
            data
        );
    };

/* =========================================
   MARKETPLACE
========================================= */

export const getMarketplaceListings =
    async (
        search = "",
        crop = "",
        min_qty = ""
    ) => {
        return API.get(
            "/marketplace/listings",
            {
                params: {
                    search,
                    crop,
                    min_qty,
                },
            }
        );
    };

export const getListingDetails =
    async (id) => {
        return API.get(
            `/marketplace/listing/${id}`
        );
    };

/* =========================================
   PURCHASE REQUESTS
========================================= */

export const createPurchaseRequest =
    async (data) => {
        return API.post(
            "/purchase/request",
            data,
            userHeaders()
        );
    };

export const getMyRequests =
    async () => {
        return API.get(
            "/purchase/my-requests",
            userHeaders()
        );
    };

/* =========================================
   ADMIN AUTH
========================================= */

export const adminLogin = async (
    data
) => {
    return API.post(
        "/admin/login",
        data
    );
};

/* =========================================
   ADMIN ANALYTICS
========================================= */

export const getAdminAnalytics =
    async () => {
        return API.get(
            "/admin/analytics",
            adminHeaders()
        );
    };

/* =========================================
   ADMIN LISTINGS
========================================= */

export const getAdminListings =
    async ({
        status = "",
        verified = "",
        search = "",
    } = {}) => {
        return API.get(
            "/admin/listings",
            {
                ...adminHeaders(),

                params: {
                    status,
                    verified,
                    search,
                },
            }
        );
    };

/* =========================================
   ADMIN VERIFICATION WORKSPACE
========================================= */

export const getVerificationWorkspace =
    async (listingId) => {
        return API.get(
            `/admin/verification/${listingId}`,
            adminHeaders()
        );
    };

/* =========================================
   SATELLITE VERIFICATION
========================================= */

export const verifyListingSatellite =
    async (listingId) => {
        return API.post(
            `/admin/listing/${listingId}/verify`,
            {},
            adminHeaders()
        );
    };

/* =========================================
   LISTING STATUS UPDATE
========================================= */

export const updateListingStatus =
    async (
        listingId,
        status
    ) => {
        return API.patch(
            `/admin/listing/${listingId}/status`,
            {
                status,
            },
            adminHeaders()
        );
    };

/* =========================================
   ADMIN PURCHASE GOVERNANCE
========================================= */

export const getAdminPurchases =
    async (
        status = ""
    ) => {
        return API.get(
            "/admin/purchases",
            {
                ...adminHeaders(),

                params: {
                    status,
                },
            }
        );
    };

/* =========================================
   AXIOS ERROR INTERCEPTOR
========================================= */

API.interceptors.response.use(
    (response) => response,

    (error) => {
        console.log(
            "FULL ERROR:",
            error.response?.data
        );

        console.log(
            "STATUS:",
            error.response?.status
        );

        console.log(
            "RAW ERROR:",
            error
        );

        if (
            error.response?.status ===
            401
        ) {
            localStorage.removeItem(
                "adminToken"
            );

            localStorage.removeItem(
                "admin"
            );

            if (
                window.location.pathname.startsWith(
                    "/admin"
                )
            ) {
                window.location.href =
                    "/admin/login";
            }
        }

        return Promise.reject(
            error
        );
    }
);

export default API;