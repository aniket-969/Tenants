import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired, trying to refresh...");

      try {
        // Call your refresh token API
        const refreshResponse = await axios.post(
          "http://localhost:3000/api/v1/users/refreshTokens",
          {},
          { withCredentials: true }
        );
        console.log(refreshResponse);
        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          // Attach new token to the original failed request
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new token
          return axiosClient(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token failed, logging out user.");
        localStorage.removeItem("session"); // Clear session on failure
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
