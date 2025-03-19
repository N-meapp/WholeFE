import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL ;


const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Add a response interceptor to handle token expiration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");

//         if (!refreshToken) {
//           console.log("No refresh token available. Redirect to login.");
//           return Promise.reject(error);
//         }

//         // Refresh token API request
//         const { data } = await api.post("token/refresh/", {
//             refresh: refreshToken,
//           });

//         if (data?.access_token) {
//           localStorage.setItem("accessToken", data.access_token);
//           originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
//           return api(originalRequest); // Retry the original request
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
