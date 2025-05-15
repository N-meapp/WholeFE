

import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL ;

const apiUser = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token

apiUser.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log(token,'tooookkkkkeeeeenn request');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiUser.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");  
          console.log(token,'tooookkkkkeeeeenn response');


      if (!refreshToken) {
        console.log("No refresh token available. Redirect to login.");
        // window.location.href = "/"; // Redirect to login if no refresh token
        return Promise.reject(error);
      }

      try {
        console.log("refresh token sented");
        // Send refresh token to backend
        const { data } = await axios.post(`${BASE_URL}refresh/`, {
          
          refresh : refreshToken,  // Send refresh_token as part of the request body
        },
       
         {
          headers: {
            'Content-Type': 'application/json',  // Ensure you're sending JSON data
          },
        }
        
        );
 
        console.log(data, "response refresh token !!!!!!!!!!!!!!!!!!!!1");
        
        if (data?.access_token && data?.refresh_token) {
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);  // Store new refresh token
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return apiUser(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // In case refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);




export default apiUser;
