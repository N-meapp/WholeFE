import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL ;


const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
// Example of refreshing the token in the frontend (axios interceptors)
api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.log("No refresh token available. Redirect to login.");
        return Promise.reject(error);
      }

      try {
        // Send refresh token to backend
        const { data } = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        if (data?.access_token) {
          // Store the new access token
          localStorage.setItem("accessToken", data.access_token);
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return api(originalRequest);  // Retry the original request with the new access token
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
