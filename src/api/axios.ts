import axios from "axios";
import Cookies from "js-cookie";
import { logoutUser } from "./user.api";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor untuk handle token expired / unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    // Kalau token invalid atau expired
    if (status === 401 || status === 403) {
      try {
        // Panggil logout API backend
        await logoutUser();
      } catch (err) {
        console.warn("Gagal logout di server:", err);
      }

      // Bersihkan cookies local
      Cookies.remove("authToken");
      Cookies.remove("role");

      // Redirect user ke halaman login admin
      if (window.location.pathname !== "/panels-admins/auth-login") {
        window.location.href = "/panels-admins/auth-login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
