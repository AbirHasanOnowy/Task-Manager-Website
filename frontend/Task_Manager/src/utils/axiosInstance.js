import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        //   console.error("Unauthorized access - redirecting to login");
        window.location.href = "/login"; // Redirect to login page
      } else if (error.response.status === 403) {
        // Handle forbidden access
        console.error(
          "Forbidden access - you do not have permission to view this resource."
        );
      } else if (error.response.status === 404) {
        // Handle not found error
        console.error("Resource not found.");
      } else if (error.response.status >= 500) {
        // Handle server errors
        console.error("Server error - please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout error
      console.error("Request timed out. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
