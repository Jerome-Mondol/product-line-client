// axios.js
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    }
})

export const secureAxiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // This is crucial for cookies
});

secureAxiosInstance.interceptors.request.use(
    (config) => {
        // Get token from cookies and add to headers
        const token = getCookie('token'); // You need to create this function
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper function to get cookie
function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}