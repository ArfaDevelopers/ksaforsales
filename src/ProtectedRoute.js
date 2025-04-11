import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from "react";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
