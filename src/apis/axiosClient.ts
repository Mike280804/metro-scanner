import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor RESPONSE: handle global errors (nếu muốn)
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Chỉ log lỗi khác 400
      if (status !== 400) {
        console.error("API Error:", status, error.response.data);
      }
    } else {
      console.error("API Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
