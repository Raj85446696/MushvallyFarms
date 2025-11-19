import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return children;
  }
  return children;
};

export default PublicRoute;
