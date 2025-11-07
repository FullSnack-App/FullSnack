// src/components/ProtectedUserRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedUserRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
