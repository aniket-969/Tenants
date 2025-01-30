import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false; // Prevent multiple refresh attempts

axiosClient.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    if (error.response?.status === 401 && !isRefreshing) {
      console.log("Token expired, attempting to refresh...");

      isRefreshing = true; // Set flag to prevent multiple refreshes

      try {
        // Call the refresh token API
        const refreshResponse = await axios.post(
          "http://localhost:3000/api/v1/users/refreshTokens",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          // Attach new token to the original request and retry
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          isRefreshing = false; // Reset flag
          return axiosClient(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token failed, logging out user.");

        if (!localStorage.getItem("sessionExpired")) {
          localStorage.setItem("sessionExpired", "true"); // Prevent infinite redirects
          localStorage.removeItem("session"); // Clear session
          window.location.href = "/login"; // Redirect to login page
        }
      }

      isRefreshing = false; // Reset flag
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
