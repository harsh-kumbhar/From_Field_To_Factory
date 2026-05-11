import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
});

export const loginBuyer = async (data) => {
    return API.post("/auth/login", data);
};

export const registerBuyer = async (data) => {
    return API.post("/auth/register", data);
};

export const getMarketplaceListings = async (
    search = "",
    crop = "",
    min_qty = ""
) => {
    return API.get("/marketplace/listings", {
        params: {
            search,
            crop,
            min_qty,
        },
    });
};

export const getListingDetails = async (id) => {
    return API.get(`/marketplace/listing/${id}`);
};
export const createPurchaseRequest = async (
    data
) => {
    const token =
        localStorage.getItem("token");

    return api.post(
        "/purchase/request",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getMyRequests = async () => {
    const token =
        localStorage.getItem("token");

    return API.get(
        "/purchase/my-requests",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
export default API;