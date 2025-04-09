

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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




// api.interceptors.response.use(
//   (response) => response, // Return the response directly if it's successful
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is a 401 Unauthorized and the original request hasn't been retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       const refreshToken = localStorage.getItem("refreshToken");

//       // Check if refresh token exists in localStorage
//       if (!refreshToken) {
//         console.log("No refresh token available. Redirecting to login.");
//         // window.location.href = "/login"; // Redirect to login page if no refresh token is available
//         return Promise.reject(error);
//       }

//       try {
//         console.log("Sending refresh token to backend...");

//         // Make an API request to the refresh token endpoint
//         const { data } = await api.post("RefreshTokenView/", {
//           refresh: refreshToken,  // Send the refresh token as part of the request body
//         }, {
//           headers: {
//             'Content-Type': 'application/json', // Ensure the content is sent as JSON
//           },
//         });

//         console.log("Received new tokens:", data);

//         // If both access and refresh tokens are received, store them in localStorage
//         if (data?.access_token && data?.refresh_token) {
//           localStorage.setItem("accessToken", data.access_token);
//           localStorage.setItem("refreshToken", data.refresh_token);  // Store the new refresh token

//           // Update the Authorization header of the original request with the new access token
//           originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

//           // Retry the original request with the new access token
//           return api(originalRequest);
//         } else {
//           throw new Error("Failed to refresh tokens: No access or refresh token received");
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);

//         // In case of an error with the refresh request, clear tokens and redirect to login
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // window.location.href = "/login"; // Redirect to login page
//         return Promise.reject(refreshError);
//       }
//     }

//     // If error is not a 401 or there was an issue refreshing the token, reject the promise
//     return Promise.reject(error);
//   }
// );















apiUser.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");  

      if (!refreshToken) {
        console.log("No refresh token available. Redirect to login.");
        window.location.href = "/"; // Redirect to login if no refresh token
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
        window.location.href = "/"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);



// Add a response interceptor to handle token expiration
// Example of refreshing the token in the frontend (axios interceptors)
// api.interceptors.response.use(
//   async (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         console.log("No refresh token available. Redirect to login.");
//         return Promise.reject(error);
//       }

//       try {
//         // Send refresh token to backend
//         const { data } = await api.post("token/refresh/", {
//           refresh_token: refreshToken,
//         });

//         if (data?.access_token && data?.refresh_token) {
//           localStorage.setItem("accessToken", data.access_token);
//           localStorage.setItem("refreshToken", data.refresh_token);  // Store new refresh token
//           originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );









export default apiUser;
