import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await axiosInstance.get("/users/profiles", { withCredentials: true });
        const user = res.data.data;

        const userRole =
          user.role?.toUpperCase() ||
          Cookies.get("role")?.toUpperCase() || "";

        // 🔹 Hierarki Akses:
        // SUPER_ADMIN boleh akses semua (admin & superadmin)
        // ADMIN hanya boleh akses halaman admin
        const required = requiredRole?.toUpperCase();

        if (
          userRole === "SUPER_ADMIN" ||
          userRole === required
        ) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, [requiredRole]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-sm animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/panels-admins/auth-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
