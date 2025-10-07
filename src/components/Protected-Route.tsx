import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = Cookies.get("authToken");
  const userRole = Cookies.get("role");

  if (!token) {
    // kalau belum login lempar ke login
    return <Navigate to="/panels-admins/auth-login" replace />;
  }

  if (role && userRole !== role) {
    // kalau butuh role tertentu
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
