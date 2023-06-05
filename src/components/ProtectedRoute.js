import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;
