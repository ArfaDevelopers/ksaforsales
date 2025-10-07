import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading1 from "../public/Progress circle.png";

import React from "react";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* <img
          src={loading}
          alt="Loading..."F
          style={{
            width: "200px",
            height: "200px",
            animation: "spin 1s linear infinite", // Apply the spin animation
          }}
        /> */}

        <p>Loading...</p>
        <style>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
